import { createReducer, on } from '@ngrx/store';
import { ConditionSummaryActions as conditionSummary } from '../actions';
import { ConditionLists } from '../../generated-data-api';

export const conditionsSummaryFeatureKey = 'conditionsSummary';

export interface State {
    conditionsSummary: ConditionLists;
    failure: boolean;
}

export const initialState: State = {
    conditionsSummary: {
        activeConcerns: [],
        activeConditions: [],
        inactiveConcerns: [],
        inactiveConditions: []
    },
    failure: false
};

export const reducer = createReducer(
    initialState,
    on(conditionSummary.loadConditionSummaryForSubjectSuccessAction, (state, { data: payload }) =>
    ({
        ...state,
        conditionsSummary: payload,
    })),
    on(conditionSummary.loadConditionSummaryForSubjectFailureAction, (state) =>
    ({
        ...state,
        failure: true
    })),

);

export const getConditionsSummary = (state: State) => state.conditionsSummary;
