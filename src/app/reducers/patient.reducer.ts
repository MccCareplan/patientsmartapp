import {createReducer, on} from '@ngrx/store';
import {MccPatient} from '../generated-data-api';
import * as patient from '../actions/patient.actions';

export const patientFeatureKey = 'patient';

export interface State {
    patients: string[];
    profile: MccPatient;
    failure: boolean;
}

export const initialState: State = {
    patients: [],
    profile: null,
    failure: false
};


export const reducer = createReducer(
    initialState,
    // tslint:disable-next-line:variable-name
    on(patient.LoadAllSuccessAction, (state, {data: payload}) =>
        ({
            ...state,
            patients: payload
        })),
    on(patient.LoadPatientSuccessAction, (state, {data: payload}) =>
        ({
            ...state,
            profile: payload,
            failure: false
        })),
    on(patient.LoadPatientFailAction, (state) =>
        ({
            ...state,
            failure: true
        })),
);

export const getPatients = (state: State) => {
    console.log('[patient.reducer.ts] getPatients state ', state);
    return state.patients; };

export const getProfile = (state: State) => state.profile;

