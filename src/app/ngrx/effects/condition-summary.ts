import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ConditionSummaryActions as conditionsSummary } from '../actions';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ConditionSummaryService } from 'src/app/services/condition-summary.service';

@Injectable()
export class ConditionsSummaryEffects {

    loadConditionsSummaryByPatientId$: any = createEffect((): any => this.actions$.pipe(
        ofType(conditionsSummary.LOAD_FOR_SUBJECT_CONDITIONS_SUMMARY),
        switchMap(action => {
            return this.service
                // @ts-ignore
                .getConditionsSummaryPatientId(action.subjectId)
                .pipe(
                    map(conditionsSummaryResult => conditionsSummary.loadConditionSummaryForSubjectSuccessAction({ data: conditionsSummaryResult })
                    ),
                    catchError(error =>
                        of(conditionsSummary.loadConditionSummaryForSubjectFailureAction({ error }))
                    )
                );
        })));

    constructor(private actions$: Actions,
        private service: ConditionSummaryService) { }
}
