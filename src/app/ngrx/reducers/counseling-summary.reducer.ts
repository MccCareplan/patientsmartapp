import { createReducer, on } from '@ngrx/store';
import { CounselingSummary } from 'src/generated-data-api/models/CounselingSummary';
import { CounselingSummaryActions } from '../actions';

export const counselingSummaryFeatureKey = 'CounselingSummary';

export interface State {
    counselingSummary: CounselingSummary[];
    failure: boolean;
}

export const initialState: State = {
    counselingSummary: [],
    failure: false
};

export const reducer = createReducer(
    initialState,
    on(CounselingSummaryActions.loadCounselingSummaryForSubjectSuccessAction, (state, { data: payload }) =>
    ({
        ...state,
        counselingSummary: payload,
    })),
    on(CounselingSummaryActions.loadCounselingSummaryForSubjectFailureAction, (state) =>
    ({
        ...state,
        failure: true
    })),

);

export const getCounselingSummary = (state: State) => state.counselingSummary;
