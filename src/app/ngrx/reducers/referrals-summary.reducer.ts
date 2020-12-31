import { createReducer, on } from '@ngrx/store';
import { ReferralsSummaryActions as referralsSummaryActions } from '../actions';
import { ReferralSummary } from 'src/app/generated-data-api/models/ReferralSummary';

export const referralsSummaryFeatureKey = 'ReferralsSummary';

export interface State {
    referralsSummary: ReferralSummary[];
    failure: boolean;
}

export const initialState: State = {
    referralsSummary: [],
    failure: false
};

export const reducer = createReducer(
    initialState,
    on(referralsSummaryActions.loadReferralsSummaryForSubjectSuccessAction, (state, { data: payload }) =>
    ({
        ...state,
        referralsSummary: payload,
    })),
    on(referralsSummaryActions.loadReferralsSummaryForSubjectFailureAction, (state) =>
    ({
        ...state,
        failure: true
    })),

);

export const getReferralsSummary = (state: State) => state.referralsSummary;
