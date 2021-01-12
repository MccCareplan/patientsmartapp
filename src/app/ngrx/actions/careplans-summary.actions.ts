import { createAction, props } from '@ngrx/store';

export const LOAD_FOR_SUBJECT_CAREPLANS_SUMMARY = '[CareplansSummary] Load for Subject Careplans Summary';
export const LOAD_FOR_SUBJECT_CAREPLANS_SUMMARY_SUCCESS = '[CareplansSummary] Load for Subject Careplans Summary Success';
export const LOAD_FOR_SUBJECT_CAREPLANS_SUMMARY_FAILURE = '[CareplansSummary] Load for Subject Careplans Summary Failure';

export const loadCareplansSummaryForSubjectAction = createAction(
  LOAD_FOR_SUBJECT_CAREPLANS_SUMMARY,
  props<{ subjectId: string }>()
);

export const loadCareplansSummaryForSubjectSuccessAction = createAction(
  LOAD_FOR_SUBJECT_CAREPLANS_SUMMARY_SUCCESS,
  props<{ data: any }>()
);

export const loadCareplansSummaryForSubjectFailureAction = createAction(
  LOAD_FOR_SUBJECT_CAREPLANS_SUMMARY_FAILURE,
  props<{ error: any }>()
);
