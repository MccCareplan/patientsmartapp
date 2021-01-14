import { createReducer, on } from '@ngrx/store';
import { GoalsSummaryActions as goalsSummaryActions } from '../actions';
import { GoalLists, GoalSummary } from '../../generated-data-api';

export const goalsSummaryFeatureKey = 'GoalsSummary';

export interface State {
    goalsSummary: GoalLists;
    failure: boolean;
}

export const initialState: State = {
    goalsSummary: {},
    failure: false
};

export const reducer = createReducer(
    initialState,
    on(goalsSummaryActions.loadGoalsSummaryForSubjectSuccessAction, (state, { data: payload }) =>
    ({
        ...state,
        goalsSummary: payload,
    })),
    on(goalsSummaryActions.loadGoalsSummaryForSubjectFailureAction, (state) =>
    ({
        ...state,
        failure: true
    })),

);

export const getGoalsSummary = (state: State) => state.goalsSummary;
