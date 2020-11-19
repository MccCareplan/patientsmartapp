import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType, Effect} from '@ngrx/effects';
import { EMPTY } from 'rxjs';

import {DataService} from '../services/data.service';
import * as patient from '../actions/patient.actions';
import { map, mergeMap, catchError } from 'rxjs/operators';



@Injectable()
export class PatientEffects {

    @Effect()
    loadAll$: Observable<Action> = this.actions$.pipe(
        ofType(patient.LOAD_ALL),
        switchMap(() => {
            return this.service.getAll()
                .pipe(
                map(patients => patient.LoadAllSuccessAction({data: patients}),
                catchError(error => observableOf(patient.LoadAllFailAction(error)))));
        }));

    loadAllEffect$: any = createEffect((): any => this.actions$.pipe(
        ofType(patient.LOAD_ALL),
        concatMap(action =>
            this.service
                .getAll()
                .pipe(
                    map(patients => patient.LoadAllSuccessAction({data: patients})),
                    catchError(error =>
                        observableOf(patient.LoadAllFailAction({ error }))
                    )
                )
        )
        )
    );




    constructor(
        private actions$: Actions,
        private service: DataService
    ) {
    }

}
