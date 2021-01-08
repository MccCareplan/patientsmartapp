import { createReducer, on } from '@ngrx/store';
import { EducationSummary } from 'src/generated-data-api/models/EducationSummary';
import { EducationSummaryActions as educationSummaryActions } from '../actions';

export const educationSummaryFeatureKey = 'EducationSummary';

export interface State {
    educationSummary: EducationSummary[];
    failure: boolean;
}

export const initialState: State = {
    educationSummary: [],
    failure: false
};

export const reducer = createReducer(
    initialState,
    on(educationSummaryActions.loadEducationSummaryForSubjectSuccessAction, (state, { data: payload }) =>
    ({
        ...state,
        educationSummary: payload,
    })),
    on(educationSummaryActions.loadEducationSummaryForSubjectFailureAction, (state) =>
    ({
        ...state,
        failure: true
    })),
);

export const getEducationSummary = (state: State) => state.educationSummary;
