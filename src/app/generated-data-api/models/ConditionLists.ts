/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import { ConditionSummary } from './ConditionSummary';

export interface ConditionLists {
    activeConditions: Array<ConditionSummary>;
    inactiveConditions: Array<ConditionSummary>;
    activeConcerns: Array<ConditionSummary>;
    inactiveConcerns: Array<ConditionSummary>;
}
