import { createAction, props } from '@ngrx/store';

export const LOAD_FOR_SUBJECT_CONDITIONS_SUMMARY = '[ConditionsSummary] Load for Subject Conditions Summary';
export const LOAD_FOR_SUBJECT_CONDITIONS_SUMMARY_SUCCESS = '[ConditionsSummary] Load for Subject Conditions Summary Success';
export const LOAD_FOR_SUBJECT_CONDITIONS_SUMMARY_FAILURE = '[ConditionsSummary] Load for Subject Conditions Summary Failure';

export const loadConditionSummaryForSubjectAction = createAction(
  LOAD_FOR_SUBJECT_CONDITIONS_SUMMARY,
  props<{ subjectId: string, carePlanId?: string }>()
);

export const loadConditionSummaryForSubjectSuccessAction = createAction(
  LOAD_FOR_SUBJECT_CONDITIONS_SUMMARY_SUCCESS,
  props<{ data: any }>()
);

export const loadConditionSummaryForSubjectFailureAction = createAction(
  LOAD_FOR_SUBJECT_CONDITIONS_SUMMARY_FAILURE,
  props<{ error: any }>()
);
