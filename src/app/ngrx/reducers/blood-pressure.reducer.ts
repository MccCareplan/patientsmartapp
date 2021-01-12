import { createReducer, on } from '@ngrx/store';
import { BloodPressureActions as bloodPressureActions } from '../actions';
import { MccObservation } from '../../generated-data-api';

export const bloodPressureFeatureKey = 'BloodPressure';

export interface State {
    bloodPressure: MccObservation[];
    failure: boolean;
}

export const initialState: State = {
    bloodPressure: [],
    failure: false
};

export const reducer = createReducer(
    initialState,
    on(bloodPressureActions.loadBloodPressureForSubjectSuccessAction, (state, { data: payload }) =>
    ({
        ...state,
        bloodPressure: payload,
    })),
    on(bloodPressureActions.loadBloodPressureForSubjectFailureAction, (state) =>
    ({
        ...state,
        failure: true
    })),

);

export const getBloodPressure = (state: State) => state.bloodPressure;
