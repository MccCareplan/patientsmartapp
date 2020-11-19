import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType, Effect} from '@ngrx/effects';
import {EMPTY, Observable, of} from 'rxjs';

import {DataService} from '../services/data.service';
import * as patient from '../actions/patient.actions';
import {map, mergeMap, catchError, startWith, concatMap, switchMap} from 'rxjs/operators';
import {Action} from '@ngrx/store';


@Injectable()
export class PatientEffects {

    @Effect()
    loadAll$: Observable<Action> = this.actions$.pipe(
        ofType(patient.LOAD_ALL),
        switchMap(() => {
            return this.service.getAll()
                .pipe(
                    map(patients => patient.LoadAllSuccessAction({data: patients}),
                        catchError(error => of(patient.LoadAllFailAction(error)))));
        }));

    loadAllEffect$: any = createEffect((): any => this.actions$.pipe(
        ofType(patient.LOAD_ALL),
        concatMap(action =>
            this.service
                .getAll()
                .pipe(
                    map(patients => patient.LoadAllSuccessAction({data: patients})),
                    catchError(error =>
                        of(patient.LoadAllFailAction({error}))
                    )
                )
        )
        )
    );

    @Effect()
    load$: Observable<Action> = this.actions$.pipe(
        ofType(patient.SELECT),
        startWith(patient.selectAction({data: 'Patricia'}))
        , map(toPayload)
        , switchMap(payload => {
            return this.service.getPatientProfile(payload).pipe(
                switchMap(profile => [
                    patient.LoadPatientSuccessAction({data: profile}),
                    // new group.LoadAction(profile.userId)
                ]),
                    catchError((error) => of(new user.LoadProfileFailAction(error))));
        }));

    loadEffect$: any = createEffect((): any => this.actions$.pipe(
        ofType(patient.SELECT),
        startWith(patient.selectAction({data: 'Patricia'}))
        , map(toPayload)
        , switchMap(payload => {
            return this.service.getPatientProfile(payload).pipe(
                switchMap(profile => [
                    new user.LoadProfileSuccessAction(profile),
                    // new group.LoadAction(profile.userId)
                ]),
                    catchError((error) => of(new user.LoadProfileFailAction(error))));


        })));


    constructor(
        private actions$: Actions,
        private service: DataService
    ) {
    }

}
