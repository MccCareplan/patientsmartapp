import {createAction, props} from '@ngrx/store';
import {MccCarePlan} from '../../generated-data-api';
export const SELECT = '[Careplan] Select';
export const LOAD_ALL_FOR_SUBJECT = '[Careplan] Load All for Subject';
export const LOAD_ALL_FOR_SUBJECT_SUCCESS = '[Careplan] Load All for Subject Success';
export const LOAD_ALL_FOR_SUBJECT_FAILURE = '[Careplan] Load All for Subject Failure';
export const SELECT_CAREPLAN_SUCCESS = '[Careplan] Select Success';
export const SELECT_CAREPLAN_FAIL = '[Careplan] Select Fail';

// Subject is the patient

export const SelectAction = createAction(
    SELECT,
    props<{ data: string }>()
);

export const SelectCarePlanSuccessAction = createAction(
    SELECT_CAREPLAN_SUCCESS,
    props<{ data: MccCarePlan }>()
);
export const SelectCarePlanFailAction = createAction(
    SELECT_CAREPLAN_FAIL,
    props<{ data: string }>()
);

export const LoadCarePlansForSubjectAction = createAction(
    LOAD_ALL_FOR_SUBJECT,
    props<{ data: string }>()
);

export const loadCarePlansForSubjectSuccessAction = createAction(
    LOAD_ALL_FOR_SUBJECT_SUCCESS,
    props<{ data: any }>()
);

export const loadCarePlansForSubjectFailureAction = createAction(
    LOAD_ALL_FOR_SUBJECT_FAILURE,
    props<{ error: any }>()
);
