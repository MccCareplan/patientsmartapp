import {compose} from '@ngrx/core/compose';
import {createSelector} from '@ngrx/store';
import {combineReducers} from '@ngrx/store';
import * as fromPatient from './patient.reducer';
import * as fromDevMode from './dev-mode.reducer';


export interface State {
    topLevel: {
        patient: fromPatient.State;
        devmode: fromDevMode.State;
    };
}

const reducers = {
    patient: fromPatient.reducer,
    devmode: fromDevMode.reducer
    // group: fromGroup.reducer,
};

const combinedReducer = combineReducers(reducers);

// tslint:disable-next-line:typedef
export function reducer(state: any, action: any) {
    return combinedReducer(state, action);
}

export const getPatientState = (state: State) => {
    // console.log('[index.ts] getPatientState state: ', state);  // todo: remove after testing..
    return state.topLevel.patient;
};

export const getDevModeState = (state: State) => state.topLevel.devmode;
export const getPatientProfile = createSelector(getPatientState, fromPatient.getProfile);
export const getPatients = createSelector(getPatientState, fromPatient.getPatients);
export const getDevModeObject = createSelector(getDevModeState, fromDevMode.getDevMode);
export const getDevModeFlag = createSelector(getDevModeState,  (objDm: fromDevMode.State) => objDm.devmode);
// export const getGroupState = (state: State) => state.group;
// export const getGroups = createSelector(getGroupState, fromGroup.getGroups);
