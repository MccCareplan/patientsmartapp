import { createAction, props } from '@ngrx/store';
import {Contact, MccCarePlan} from '../../generated-data-api';

export const SELECT = '[Contact] Select';
export const LOAD_FOR_SUBJECT_CAREPLAN = '[Contact] Load for Subject Careplan';
export const LOAD_FOR_SUBJECT_CAREPLAN_SUCCESS = '[Contact] Load for Subject Careplan Success';
export const LOAD_FOR_SUBJECT_CAREPLAN_FAILURE = '[Contact] Load for Subject Careplan Failure';
export const SELECT_CONTACT_SUCCESS = '[Contact] Select Success';
export const SELECT_CONTACT_FAIL = '[Contact] Select Fail';

export const SelectAction = createAction(
    SELECT,
    props<{ data: string }>()
);

export const SelectContactSuccessAction = createAction(
    SELECT_CONTACT_SUCCESS,
    props<{ data: Contact }>()
);
export const SelectCarePlanFailAction = createAction(
    SELECT_CONTACT_FAIL,
    props<{ data: string }>()
);

export const loadContactsForSubjectAndCarePlanAction = createAction(
    LOAD_FOR_SUBJECT_CAREPLAN,
    props<{subjectId: string, carePlanId: string }>()
);

export const loadContactsForSubjectAndCarePlanSuccessAction = createAction(
  LOAD_FOR_SUBJECT_CAREPLAN_SUCCESS,
  props<{ data: any }>()
);

export const loadContactsForSubjectAndCarePlanFailureAction = createAction(
  LOAD_FOR_SUBJECT_CAREPLAN_FAILURE,
  props<{ error: any }>()
);
