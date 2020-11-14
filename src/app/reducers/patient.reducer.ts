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
    on(patient.LoadAllSuccessAction, (state, {payload}) =>
        ({
            ...state,
            patients: payload.value
        })),
    on(patient.LoadPatientSuccessAction, (state, {payload}) =>
        ({
            ...state,
            patient: payload.value,
            failure: false
        })),
    on(patient.LoadPatientFailAction, (state) =>
        ({
            ...state,
            failure: true
        })),
);

export const getPatients = (state: State) => state.patients;
export const getProfile = (state: State) => state.profile;

