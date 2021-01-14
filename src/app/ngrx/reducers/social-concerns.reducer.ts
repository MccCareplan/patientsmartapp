import { createReducer, on } from '@ngrx/store';
import { SocialConcern } from 'src/app/generated-data-api';
import { SocialConcernsActions as socialConcernsActions } from '../actions';

export const socialConcernsFeatureKey = 'SocialConcerns';

export interface State {
    socialConcerns: SocialConcern[];
    failure: boolean;
}

export const initialState: State = {
    socialConcerns: [],
    failure: false
};

export const reducer = createReducer(
    initialState,
    on(socialConcernsActions.loadSocialConcernsForSubjectSuccessAction, (state, { data: payload }) =>
    ({
        ...state,
        socialConcerns: payload,
    })),
    on(socialConcernsActions.loadSocialConcernsForSubjectFailureAction, (state) =>
    ({
        ...state,
        failure: true
    })),

);

export const getSocialConcerns = (state: State) => state.socialConcerns;