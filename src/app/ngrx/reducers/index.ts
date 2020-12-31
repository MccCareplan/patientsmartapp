import { createSelector } from '@ngrx/store';
import { combineReducers } from '@ngrx/store';
import * as fromPatient from './patient.reducer';
import * as fromDevMode from './dev-mode.reducer';
import * as fromCarePlan from './careplan.reducer';
import * as fromContact from './contact.reducer';
import * as fromConditionsSummary from './conditions-summary.reducer';
import * as fromGoalsSummary from "./goals-summary.reducer";
import * as fromMedicationSummary from "./medication-summary.reducer";
import * as fromSocialConcerns from "./social-concerns.reducer";
import * as fromCarePlansSummary from "./careplans-summary.reducer";
import * as fromEducationSummary from "./education-summary.reducer";
import * as fromReferralsSummary from "./referrals-summary.reducer";

export interface State {
    topLevel: {
        patient: fromPatient.State;
        devmode: fromDevMode.State;
        careplan: fromCarePlan.State;
        contact: fromContact.State;
        conditionsSummary: fromConditionsSummary.State;
        goalsSummary: fromGoalsSummary.State;
        medicationSummary: fromMedicationSummary.State;
        socialConcerns: fromSocialConcerns.State;
        carePlansSummary: fromCarePlansSummary.State;
        educationSummary: fromEducationSummary.State;
        referralsSummary: fromReferralsSummary.State;
    };
}

const reducers = {
    patient: fromPatient.reducer,
    devmode: fromDevMode.reducer,
    careplan: fromCarePlan.reducer,
    contact: fromContact.reducer,
    conditionsSummary: fromConditionsSummary.reducer,
    goalsSummary: fromGoalsSummary.reducer,
    medicationSummary: fromMedicationSummary.reducer,
    socialConcerns: fromSocialConcerns.reducer,
    carePlansSummary: fromCarePlansSummary.reducer,
    educationSummary: fromEducationSummary.reducer,
    referralsSummary: fromReferralsSummary.reducer
};

const combinedReducer = combineReducers(reducers);

// tslint:disable-next-line:typedef
export function reducer(state: any, action: any) {
    return combinedReducer(state, action);
}

export const getPatientState = (state: State) => {
    return state.topLevel.patient;
};
export const getCarePlansState = (state: State) => {
    return state.topLevel.careplan;
};
export const getContactState = (state: State) => {
    return state.topLevel.contact;
};
export const getConditionsSummaryState = (state: State) => {
    return state.topLevel.conditionsSummary;
}
export const getGoalsSummaryState = (state: State) => {
    return state.topLevel.goalsSummary;
}
export const getMedicationSummaryState = (state: State) => {
    return state.topLevel.medicationSummary;
}
export const getSocialConcernsState = (state: State) => {
    return state.topLevel.socialConcerns;
}
export const getCarePlansSummaryState = (state: State) => {
    return state.topLevel.carePlansSummary;
}
export const getEducationSummaryState = (state: State) => {
    return state.topLevel.educationSummary;
}
export const getReferralsSummaryState = (state: State) => {
    return state.topLevel.referralsSummary;
}

export const getDevModeState = (state: State) => state.topLevel.devmode;
export const getPatientProfile = createSelector(getPatientState, fromPatient.getProfile);
export const getPatients = createSelector(getPatientState, fromPatient.getPatients);
export const getDevModeObject = createSelector(getDevModeState, fromDevMode.getDevMode);
export const getDevModeFlag = createSelector(getDevModeState, (objDm: fromDevMode.State) => objDm.devmode);
export const getCarePlans = createSelector(getCarePlansState, fromCarePlan.getCarePlans);
export const getSelectedCarePlanId = createSelector(getCarePlansState, fromCarePlan.getSelectedCarePlanId);
export const getSelectedContactId = createSelector(getContactState, fromContact.getSelectedContactId);
export const getContacts = createSelector(getContactState, fromContact.getContacts);
export const getConditionsSummary = createSelector(getConditionsSummaryState, fromConditionsSummary.getConditionsSummary);
export const getGoalsSummary = createSelector(getGoalsSummaryState, fromGoalsSummary.getGoalsSummary);
export const getMedicationSummary = createSelector(getMedicationSummaryState, fromMedicationSummary.getMedicationSummary);
export const getSocialConcerns = createSelector(getSocialConcernsState, fromSocialConcerns.getSocialConcerns);
export const getCarePlansSummary = createSelector(getCarePlansSummaryState, fromCarePlansSummary.getCarePlansSummary);
export const getEducationSummary = createSelector(getEducationSummaryState, fromEducationSummary.getEducationSummary);
export const getReferralsSummary = createSelector(getReferralsSummaryState, fromReferralsSummary.getReferralsSummary);