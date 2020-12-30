import { createReducer, on } from '@ngrx/store';
import { MccCarePlanSummary } from 'src/generated-data-api/models/MccCarePlanSummary';
import { CareplansSummaryActions } from '../actions';

export const careplansSummaryFeatureKey = 'CareplansSummary';

export interface State {
    carePlansSummary: MccCarePlanSummary[];
    failure: boolean;
}

export const initialState: State = {
    carePlansSummary: [],
    failure: false
};

export const reducer = createReducer(
    initialState,
    on(CareplansSummaryActions.loadCareplansSummaryForSubjectSuccessAction, (state, { data: payload }) =>
    ({
        ...state,
        carePlansSummary: payload,
    })),
    on(CareplansSummaryActions.loadCareplansSummaryForSubjectFailureAction, (state) =>
    ({
        ...state,
        failure: true
    })),

);

export const getCarePlansSummary = (state: State) => state.carePlansSummary;
