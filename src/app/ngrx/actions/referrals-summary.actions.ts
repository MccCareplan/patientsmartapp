import { createAction, props } from '@ngrx/store';

export const LOAD_FOR_SUBJECT_REFERRALS_SUMMARY = '[ReferralsSummary] Load for Subject Referrals Summary';
export const LOAD_FOR_SUBJECT_REFERRALS_SUMMARY_SUCCESS = '[ReferralsSummary] Load for Subject Referrals Summary Success';
export const LOAD_FOR_SUBJECT_REFERRALS_SUMMARY_FAILURE = '[ReferralsSummary] Load for Subject Referrals Summary Failure';

export const loadReferralsSummaryForSubjectAction = createAction(
  LOAD_FOR_SUBJECT_REFERRALS_SUMMARY,
  props<{ subjectId: string }>()
);

export const loadReferralsSummaryForSubjectSuccessAction = createAction(
  LOAD_FOR_SUBJECT_REFERRALS_SUMMARY_SUCCESS,
  props<{ data: any }>()
);

export const loadReferralsSummaryForSubjectFailureAction = createAction(
  LOAD_FOR_SUBJECT_REFERRALS_SUMMARY_FAILURE,
  props<{ error: any }>()
);
