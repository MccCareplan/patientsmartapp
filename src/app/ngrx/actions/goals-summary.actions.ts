import { createAction, props } from '@ngrx/store';

export const LOAD_FOR_SUBJECT_GOALS_SUMMARY = '[GoalsSummary] Load for Subject Goals Summary';
export const LOAD_FOR_SUBJECT_GOALS_SUMMARY_SUCCESS = '[GoalsSummary] Load for Subject Goals Summary Success';
export const LOAD_FOR_SUBJECT_GOALS_SUMMARY_FAILURE = '[GoalsSummary] Load for Subject Goals Summary Failure';

export const loadGoalsSummaryForSubjectAction = createAction(
  LOAD_FOR_SUBJECT_GOALS_SUMMARY,
  props<{ subjectId: string }>()
);

export const loadGoalsSummaryForSubjectSuccessAction = createAction(
  LOAD_FOR_SUBJECT_GOALS_SUMMARY_SUCCESS,
  props<{ data: any }>()
);

export const loadGoalsSummaryForSubjectFailureAction = createAction(
  LOAD_FOR_SUBJECT_GOALS_SUMMARY_FAILURE,
  props<{ error: any }>()
);
