import { Action, createReducer, on } from '@ngrx/store';
// import * as careplan from '../actions/careplan.actions';
import {CarePlanActions as careplan} from '../actions';
import {MccCarePlan} from '../../generated-data-api';

export const careplanFeatureKey = 'careplan';

export interface State {
    selectedId: string;
    careplans: MccCarePlan[];
    failure: boolean;
}

export const initialState: State = {
    selectedId: '',
    careplans: [],
    failure: false
};

export const reducer = createReducer(
  initialState,
    on(careplan.SelectAction, (state, {data: payload}) =>
        ({
            ...state,
            selectedId: payload
        })),
    on(careplan.loadCarePlansForSubjectSuccessAction, (state, {data: payload}) =>
        ({
            ...state,
            careplans: payload,
            selectedId: (payload[0].fhirid ? payload[0].fhirid : '')  // initialize first careplan as the selected careplan
        })),
    on(careplan.loadCarePlansForSubjectFailureAction, (state) =>
        ({
            ...state,
            failure: true
        })),

);

export const getCarePlans = (state: State) =>  state.careplans;

export const getSelectedCarePlanId = (state: State) => state.selectedId;

