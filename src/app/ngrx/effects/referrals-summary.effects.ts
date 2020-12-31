import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ReferralsSummaryActions } from '../actions';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ReferralsSummaryService } from 'src/app/services/referrals-summary.service';

@Injectable()
export class ReferralsSummaryEffects {

    loadReferralsSummaryByPatientId$: any = createEffect((): any => this.actions$.pipe(
        ofType(ReferralsSummaryActions.LOAD_FOR_SUBJECT_REFERRALS_SUMMARY),
        switchMap(action => {
            return this.service
                // @ts-ignore
                .getReferralsSummaryByPatientId(action.subjectId)
                .pipe(
                    map(referralsSummary => ReferralsSummaryActions.loadReferralsSummaryForSubjectSuccessAction({ data: referralsSummary })
                    ),
                    catchError(error =>
                        of(ReferralsSummaryActions.loadReferralsSummaryForSubjectFailureAction({ error }))
                    )
                );
        })
    ));

    constructor(
        private actions$: Actions,
        private service: ReferralsSummaryService
    ) { }
}
