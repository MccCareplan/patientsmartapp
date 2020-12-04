import { createAction, props } from '@ngrx/store';

export const SELECT = '[DevMode] Select';
export const EDIT = '[DevMode] Edit';
export const LOAD_DEVMODE_SUCCESS = '[DevMode] Load DevModes Success';
export const LOAD_DEVMODE_FAIL = '[DevMode] Load DevModes Failure';
export const EDIT_DEVMODE_SUCCESS = '[DevMode] Edit DevModes Success';
export const EDIT_DEVMODE_FAIL = '[DevMode] Edit DevModes Failure';

export const LoadDevModesSuccessAction = createAction(
    LOAD_DEVMODE_SUCCESS,
  props<{ data: boolean }>()
);

export const LoadDevModesFailureAction = createAction(
    LOAD_DEVMODE_FAIL,
  props<{ error: any }>()
);

export const SelectAction = createAction(
    SELECT,
    props<{ data: boolean }>()
);

export const EditAction = createAction(
    EDIT,
    props<{ data: boolean }>()
);

export const EditDevModesSuccessAction = createAction(
    EDIT_DEVMODE_SUCCESS,
    props<{ data: boolean }>()
);

export const EditDevModesFailureAction = createAction(
    EDIT_DEVMODE_FAIL,
    props<{ error: any }>()
);
