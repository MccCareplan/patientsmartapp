import { createAction, props } from '@ngrx/store';

export const LOAD_FOR_SUBJECT_MEDICATION_SUMMARY = '[MedicationSummary] Load for Subject Medication Summary';
export const LOAD_FOR_SUBJECT_MEDICATION_SUMMARY_SUCCESS = '[MedicationSummary] Load for Subject Medication Summary Success';
export const LOAD_FOR_SUBJECT_MEDICATION_SUMMARY_FAILURE = '[MedicationSummary] Load for Subject Medication Summary Failure';

export const loadMedicationSummaryForSubjectAction = createAction(
  LOAD_FOR_SUBJECT_MEDICATION_SUMMARY,
  props<{ subjectId: string }>()
);

export const loadMedicationSummaryForSubjectSuccessAction = createAction(
  LOAD_FOR_SUBJECT_MEDICATION_SUMMARY_SUCCESS,
  props<{ data: any }>()
);

export const loadMedicationSummaryForSubjectFailureAction = createAction(
  LOAD_FOR_SUBJECT_MEDICATION_SUMMARY_FAILURE,
  props<{ error: any }>()
);
