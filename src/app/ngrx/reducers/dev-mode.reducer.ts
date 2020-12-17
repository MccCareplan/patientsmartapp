import { createReducer, on } from '@ngrx/store';
// import * as devmode from '../actions/dev-mode.actions';
import {DevModeActions as devmode} from '../actions';
export const devModeFeatureKey = 'devMode';

export interface State {
    devmode: boolean;
    failure: boolean;
}

export const initialState: State = {
    devmode: false,
    failure: false
};


export const reducer = createReducer(
  initialState,
    on(devmode.LoadDevModesSuccessAction, (state, {data: payload}) =>
        ({
            ...state,
            devmode: payload,
            failure: false
        })),
    on(devmode.LoadDevModesFailureAction, (state) =>
        ({
            ...state,
            failure: true
        })),
    on(devmode.EditAction, (state, {data: payload}) =>
        ({
            ...state,
            devmode: payload
        })),
    on(devmode.SelectAction, (state, {data: payload}) =>
        ({
            ...state,
            devmode: payload
        })),
    on(devmode.EditDevModesSuccessAction, (state, {data: payload}) =>
        ({
            ...state,
            devmode: payload,
            failure: false
        })),
    on(devmode.EditDevModesFailureAction, (state) =>
        ({
            ...state,
            failure: true
        }))
);

export const getDevMode = (state: State) => state.devmode;
