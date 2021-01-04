import { createAction, props } from '@ngrx/store';

export const LOAD_FOR_SUBJECT_SOCIAL_CONCERNS = '[SocialConcerns] Load for Subject Social Concerns';
export const LOAD_FOR_SUBJECT_SOCIAL_CONCERNS_SUCCESS = '[SocialConcerns] Load for Subject Social Concerns Success';
export const LOAD_FOR_SUBJECT_SOCIAL_CONCERNS_FAILURE = '[SocialConcerns] Load for Subject Social Concerns Failure';

export const loadSocialConcernsForSubjectAction = createAction(
  LOAD_FOR_SUBJECT_SOCIAL_CONCERNS,
  props<{ subjectId: string, carePlanId?: string }>()
);

export const loadSocialConcernsForSubjectSuccessAction = createAction(
  LOAD_FOR_SUBJECT_SOCIAL_CONCERNS_SUCCESS,
  props<{ data: any }>()
);

export const loadSocialConcernsForSubjectFailureAction = createAction(
  LOAD_FOR_SUBJECT_SOCIAL_CONCERNS_FAILURE,
  props<{ error: any }>()
);
