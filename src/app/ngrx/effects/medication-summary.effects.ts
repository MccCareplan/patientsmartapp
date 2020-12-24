import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { MedicationSummaryActions as medicationSummaryActions } from '../actions';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { MedicationSummaryService } from 'src/app/services/medication-summary.service';

@Injectable()
export class MedicationSummaryEffects {

    loadMedicationSummaryByPatientId$: any = createEffect((): any => this.actions$.pipe(
        ofType(medicationSummaryActions.LOAD_FOR_SUBJECT_MEDICATION_SUMMARY),
        switchMap(action => {
            return this.service
                // @ts-ignore
                .getMedicationSummaryByPatientId(action.subjectId)
                .pipe(
                    map(medicationSummary => medicationSummaryActions.loadMedicationSummaryForSubjectSuccessAction({ data: medicationSummary })
                    ),
                    catchError(error =>
                        of(medicationSummaryActions.loadMedicationSummaryForSubjectFailureAction({ error }))
                    )
                );
        })
    ));

    constructor(
        private actions$: Actions,
        private service: MedicationSummaryService
    ) { }
}
