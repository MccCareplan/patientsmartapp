import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { BloodPressureActions as bloodPressureActions } from '../actions';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { BloodPresureService } from 'src/app/services/blood-pressure.service';

@Injectable()
export class BloodPressureEffects {

    loadBloodPressureByPatientId$: any = createEffect((): any => this.actions$.pipe(
        ofType(bloodPressureActions.LOAD_FOR_SUBJECT_BLOOD_PRESSURE),
        switchMap(action => {
            return this.service
                // @ts-ignore
                .getBloodPressureByPatientId(action.subjectId)
                .pipe(
                    map(bloodPressureObservations => bloodPressureActions.loadBloodPressureForSubjectSuccessAction({ data: bloodPressureObservations })
                    ),
                    catchError(error =>
                        of(bloodPressureActions.loadBloodPressureForSubjectFailureAction({ error }))
                    )
                );
        })
    ));

    constructor(
        private actions$: Actions,
        private service: BloodPresureService
    ) { }
}
