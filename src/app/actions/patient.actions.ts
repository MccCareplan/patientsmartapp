import {createAction, props} from '@ngrx/store';
import {MccPatient} from '../generated-data-api';

export const SELECT = '[Patient] Select';
export const LOAD_ALL = '[Patient] Load All';
export const LOAD_ALL_SUCCESS = '[Patient] Load All Success';
export const LOAD_ALL_FAIL = '[Patient] Load All Fail';
export const LOAD_PATIENT_SUCCESS = '[Patient] Load Profile Success';
export const LOAD_PATIENT_FAIL = '[Patient] Load Profile Fail';
export const EDIT_FIELD = '[Patient] Edit Field';

export const LoadAllAction = createAction(
    LOAD_ALL,
    props<{ data: any }>()
);

export const LoadAllSuccessAction = createAction(
    LOAD_ALL_SUCCESS,
    props<{ data: string[] }>()
);

export const LoadAllFailAction = createAction(
    LOAD_ALL_FAIL,
    props<{ error: any }>()
);

export const selectAction = createAction(
    SELECT,
    props<{ data: string }>()
);

export const LoadPatientSuccessAction = createAction(
    LOAD_PATIENT_SUCCESS,
    props<{ data: MccPatient }>()
);
export const LoadPatientFailAction = createAction(
    LOAD_PATIENT_FAIL,
    props<{ data: string }>()
);

