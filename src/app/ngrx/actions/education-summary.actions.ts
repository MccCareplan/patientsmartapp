import { createAction, props } from '@ngrx/store';

export const LOAD_FOR_SUBJECT_EDUCATION_SUMMARY = '[EducationSummary] Load for Subject Education Summary';
export const LOAD_FOR_SUBJECT_EDUCATION_SUMMARY_SUCCESS = '[EducationSummary] Load for Subject Education Summary Success';
export const LOAD_FOR_SUBJECT_EDUCATION_SUMMARY_FAILURE = '[EducationSummary] Load for Subject Education Summary Failure';

export const loadEducationSummaryForSubjectAction = createAction(
  LOAD_FOR_SUBJECT_EDUCATION_SUMMARY,
  props<{ subjectId: string, carePlanId?: string }>()
);

export const loadEducationSummaryForSubjectSuccessAction = createAction(
  LOAD_FOR_SUBJECT_EDUCATION_SUMMARY_SUCCESS,
  props<{ data: any }>()
);

export const loadEducationSummaryForSubjectFailureAction = createAction(
  LOAD_FOR_SUBJECT_EDUCATION_SUMMARY_FAILURE,
  props<{ error: any }>()
);
