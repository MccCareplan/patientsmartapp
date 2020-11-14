import { createAction, props } from '@ngrx/store';
import {MccPatient} from '../generated-data-api';

export const LoadAllAction = createAction(
  '[Patient] Load All',
    props<{ data: any }>()
);

export const LoadAllSuccessAction = createAction(
  '[Patient] Load All Success',
  props<{ data: string[] }>()
);

export const LoadAllFailAction = createAction(
  '[Patient] Load All Fail',
  props<{ error: any }>()
);

export const selectAction = createAction(
    '[Patient] Select',
    props<{data: string}>()
);

export const LoadPatientSuccessAction = createAction(
    '[Patient] Load Profile Success',
    props<{data: MccPatient}>()
);
export const LoadPatientFailAction = createAction(
    '[Patient] Load Profile Fail',
    props<{data: string}>()
);
