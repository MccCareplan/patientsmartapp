import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { SocialConcernsActions as socialConcernsActions } from '../actions';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { SocialConcernsService } from 'src/app/services/social-concerns.service';

@Injectable()
export class SocialConcernsEffects {

    loadSocialConcernsByPatientId$: any = createEffect((): any => this.actions$.pipe(
        ofType(socialConcernsActions.LOAD_FOR_SUBJECT_SOCIAL_CONCERNS),
        switchMap(action => {
            return this.service
                // @ts-ignore
                .getSocialConcernsByPatientId(action.subjectId)
                .pipe(
                    map(socialConcerns => socialConcernsActions.loadSocialConcernsForSubjectSuccessAction({ data: socialConcerns })
                    ),
                    catchError(error =>
                        of(socialConcernsActions.loadSocialConcernsForSubjectFailureAction({ error }))
                    )
                );
        })
    ));

    constructor(
        private actions$: Actions,
        private service: SocialConcernsService
    ) { }
}
