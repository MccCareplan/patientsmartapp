import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, Effect } from '@ngrx/effects';
import { EMPTY, Observable, of } from 'rxjs';
import { SubjectDataServiceService } from '../../services/subject-data-service.service';
// import * as patient from '../actions/patient.actions';
import { PatientActions as patient } from '../actions';
import { map, mergeMap, catchError, startWith, concatMap, switchMap } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import { environment } from '../../../environments/environment';


@Injectable()
export class PatientEffects {

    // @Effect()
    // loadAll$: Observable<Action> = this.actions$.pipe(
    //     ofType(patient.LOAD_ALL),
    //     switchMap(() => {
    //         return this.service.getAll()
    //             .pipe(
    //                 map(patients => patient.LoadAllSuccessAction({data: patients}),
    //                     catchError(error => of(patient.LoadAllFailAction(error)))));
    //     }));

    loadAllEffect$: any = createEffect((): any => this.actions$.pipe(
        ofType(patient.LOAD_ALL),
        switchMap(action => {
            return this.service
                .getAll()
                .pipe(
                    map(patients => patient.LoadAllSuccessAction({ data: patients })),
                    catchError(error =>
                        of(patient.LoadAllFailAction({ error }))
                    )
                );
        }
        )
    )
    );

    // @Effect()
    // load$: Observable<Action> = this.actions$.pipe(
    //     ofType(patient.SELECT),
    //     startWith(patient.selectAction({data: 'Patricia'}))
    //     // , map(toPayload)
    //     , switchMap((action) => {
    //         return this.service.getPatientProfile(action.data).pipe(
    //             switchMap(profile => [
    //                 patient.LoadPatientSuccessAction({data: profile}),
    //                 // new group.LoadAction(profile.userId)
    //             ]),
    //                 catchError((error) => of(patient.LoadPatientFailAction(error))));
    //     }));

    loadEffect$: any = createEffect((): any => this.actions$.pipe(
        ofType(patient.SELECT),
        startWith(patient.SelectAction({ data: environment.testPatients[0] }))
        // , map(toPayload)
        , switchMap((action) => {
            return this.service.getPatientProfile(action.data).pipe(
                switchMap(profile => [
                    patient.LoadPatientSuccessAction({ data: profile }),
                    // new group.LoadAction(profile.userId)
                ]),
                catchError((error) => of(patient.LoadPatientFailAction(error))));
        })));


    constructor(
        private actions$: Actions,
        private service: SubjectDataServiceService
    ) {
    }

}
