import { compose } from '@ngrx/core/compose';
import { createSelector } from 'reselect';
import { combineReducers } from '@ngrx/store';
import * as fromPatient from './patient.reducer';


export interface State {
    patient: fromPatient.State;
    // group: fromGroup.State;
}

const reducers = {
    patient: fromPatient.reducer,
    // group: fromGroup.reducer,
};

const combinedReducer = combineReducers(reducers);

// tslint:disable-next-line:typedef
export function reducer(state: any, action: any) {
    return combinedReducer(state, action);
}

export const getPatientState = (state: State) => state.patient;
export const getPatientProfile = createSelector(getPatientState, fromPatient.getProfile);
export const getPatients = createSelector(getPatientState, fromPatient.getPatients);

// export const getGroupState = (state: State) => state.group;
// export const getGroups = createSelector(getGroupState, fromGroup.getGroups);
