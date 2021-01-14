import { createReducer, on } from '@ngrx/store';
import { MedicationSummaryActions as medicationSummaryActions } from '../actions';
import { MedicationLists } from '../../generated-data-api';

export const medicationSummaryFeatureKey = 'MedicationSummary';

export interface State {
    medicationSummary: MedicationLists;
    failure: boolean;
}

export const initialState: State = {
    medicationSummary: {},
    failure: false
};

export const reducer = createReducer(
    initialState,
    on(medicationSummaryActions.loadMedicationSummaryForSubjectSuccessAction, (state, { data: payload }) =>
    ({
        ...state,
        medicationSummary: payload,
    })),
    on(medicationSummaryActions.loadMedicationSummaryForSubjectFailureAction, (state) =>
    ({
        ...state,
        failure: true
    })),

);

export const getMedicationSummary = (state: State) => state.medicationSummary;
