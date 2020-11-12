/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import { GoalSummary } from './GoalSummary';
import { GoalTarget } from './GoalTarget';

export interface GoalLists {
    allGoals?: Array<GoalSummary>;
    activeClinicalGoals?: Array<GoalSummary>;
    inactiveClinicalGoals?: Array<GoalSummary>;
    activePatientGoals?: Array<GoalSummary>;
    inactivePatientGoals?: Array<GoalSummary>;
    activeTargets?: Array<GoalTarget>;
}
