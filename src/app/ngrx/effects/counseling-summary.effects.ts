import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CounselingSummaryActions } from '../actions';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { CounselingSummaryService } from 'src/app/services/counseling-summary.service';

@Injectable()
export class CounselingSummaryEffects {
    loadCounselingSummaryByPatientId$: any = createEffect((): any => this.actions$.pipe(
        ofType(CounselingSummaryActions.LOAD_FOR_SUBJECT_COUNSELING_SUMMARY),
        switchMap(action => {
            return this.service
                // @ts-ignore
                .getCounselingSummaryByPatientId(action.subjectId, action.carePlanId)
                .pipe(
                    map(
                        counselingSummary => CounselingSummaryActions.loadCounselingSummaryForSubjectSuccessAction({ data: counselingSummary })
                    ),
                    catchError(error =>
                        of(CounselingSummaryActions.loadCounselingSummaryForSubjectFailureAction({ error }))
                    )
                );
        })
    ));

    constructor(
        private actions$: Actions,
        private service: CounselingSummaryService
    ) { }
}