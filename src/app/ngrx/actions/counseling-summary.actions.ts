import { createAction, props } from '@ngrx/store';

export const LOAD_FOR_SUBJECT_COUNSELING_SUMMARY = '[CounselingSummary] Load for Subject Counseling Summary';
export const LOAD_FOR_SUBJECT_COUNSELING_SUMMARY_SUCCESS = '[CounselingSummary] Load for Subject Counseling Summary Success';
export const LOAD_FOR_SUBJECT_COUNSELING_SUMMARY_FAILURE = '[CounselingSummary] Load for Subject Counseling Summary Failure';

export const loadCounselingSummaryForSubjectAction = createAction(
  LOAD_FOR_SUBJECT_COUNSELING_SUMMARY,
  props<{ subjectId: string }>()
);

export const loadCounselingSummaryForSubjectSuccessAction = createAction(
  LOAD_FOR_SUBJECT_COUNSELING_SUMMARY_SUCCESS,
  props<{ data: any }>()
);

export const loadCounselingSummaryForSubjectFailureAction = createAction(
  LOAD_FOR_SUBJECT_COUNSELING_SUMMARY_FAILURE,
  props<{ error: any }>()
);
