import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CareplansSummaryActions } from '../actions';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { CareplansSummaryService } from 'src/app/services/careplans-summary.service';

@Injectable()
export class CareplansSummaryEffects {

    loadCareplansSummaryByPatientId$: any = createEffect((): any => this.actions$.pipe(
        ofType(CareplansSummaryActions.LOAD_FOR_SUBJECT_CAREPLANS_SUMMARY),
        switchMap(action => {
            return this.service
                // @ts-ignore
                .getCarePlansByPatientId(action.subjectId)
                .pipe(
                    map(careplansSummary => CareplansSummaryActions.loadCareplansSummaryForSubjectSuccessAction({ data: careplansSummary })
                    ),
                    catchError(error =>
                        of(CareplansSummaryActions.loadCareplansSummaryForSubjectFailureAction({ error }))
                    )
                );
        })
    ));

    constructor(
        private actions$: Actions,
        private service: CareplansSummaryService
    ) { }
}
