import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EducationSummaryActions as educationSummaryActions } from '../actions';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { EducationSummaryService } from 'src/app/services/education-summary.service';

@Injectable()
export class EducationSummaryEffects {

    loadEducationSummaryByPatientId$: any = createEffect((): any => this.actions$.pipe(
        ofType(educationSummaryActions.LOAD_FOR_SUBJECT_EDUCATION_SUMMARY),
        switchMap(action => {
            return this.service
                // @ts-ignore
                .getEducationSummaryByPatientId(action.subjectId, action.carePlanId)
                .pipe(
                    map(educationSummary => educationSummaryActions.loadEducationSummaryForSubjectSuccessAction({ data: educationSummary })
                    ),
                    catchError(error =>
                        of(educationSummaryActions.loadEducationSummaryForSubjectFailureAction({ error }))
                    )
                );
        })
    ));

    constructor(
        private actions$: Actions,
        private service: EducationSummaryService
    ) { }
}
