import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { GoalsSummaryActions as goalsSummaryActions } from '../actions';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { GoalsSummaryService } from 'src/app/services/goals-summary.service';

@Injectable()
export class GoalsSummaryEffects {

    loadGoalsSummaryByPatientId$: any = createEffect((): any => this.actions$.pipe(
        ofType(goalsSummaryActions.LOAD_FOR_SUBJECT_GOALS_SUMMARY),
        switchMap(action => {
            return this.service
                // @ts-ignore
                .getGoalsSummaryByPatientId(action.subjectId, action.carePlanId)
                .pipe(
                    map(goalsSummary => goalsSummaryActions.loadGoalsSummaryForSubjectSuccessAction({ data: goalsSummary })
                    ),
                    catchError(error =>
                        of(goalsSummaryActions.loadGoalsSummaryForSubjectFailureAction({ error }))
                    )
                );
        })
    ));

    constructor(
        private actions$: Actions,
        private service: GoalsSummaryService
    ) { }
}
