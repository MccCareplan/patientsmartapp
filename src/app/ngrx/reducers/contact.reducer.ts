import { Action, createReducer, on } from '@ngrx/store';
import {ContactActions as contact} from '../actions';
import {Contact} from '../../generated-data-api';

export const contactFeatureKey = 'contact';

export interface State {
    selectedId: string;
    contacts: Contact[];
    failure: boolean;
}

export const initialState: State = {
    selectedId: '',
    contacts: [],
    failure: false
};

export const reducer = createReducer(
    initialState,
    on(contact.SelectAction, (state, {data: payload}) =>
        ({
            ...state,
            selectedId: payload
        })),
    on(contact.loadContactsForSubjectAndCarePlanSuccessAction, (state, {data: payload}) =>
        ({
            ...state,
            contacts: payload,
            selectedId: (payload[0].fhirid ? payload[0].fhirid : '')  // initialize first contact as the selected contact
        })),
    on(contact.loadContactsForSubjectAndCarePlanFailureAction, (state) =>
        ({
            ...state,
            failure: true
        })),

);

export const getContacts = (state: State) =>  state.contacts;

export const getSelectedContactId = (state: State) => state.selectedId;
