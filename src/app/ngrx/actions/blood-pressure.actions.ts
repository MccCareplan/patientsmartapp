import { createAction, props } from '@ngrx/store';

export const LOAD_FOR_SUBJECT_BLOOD_PRESSURE = '[BloodPressure] Load for Subject BloodPressure';
export const LOAD_FOR_SUBJECT_BLOOD_PRESSURE_SUCCESS = '[BloodPressure] Load for Subject BloodPressure Success';
export const LOAD_FOR_SUBJECT_BLOOD_PRESSURE_FAILURE = '[BloodPressure] Load for Subject BloodPressure Failure';

export const loadBloodPressureForSubjectAction = createAction(
  LOAD_FOR_SUBJECT_BLOOD_PRESSURE,
  props<{ subjectId: string }>()
);

export const loadBloodPressureForSubjectSuccessAction = createAction(
  LOAD_FOR_SUBJECT_BLOOD_PRESSURE_SUCCESS,
  props<{ data: any }>()
);

export const loadBloodPressureForSubjectFailureAction = createAction(
  LOAD_FOR_SUBJECT_BLOOD_PRESSURE_FAILURE,
  props<{ error: any }>()
);
