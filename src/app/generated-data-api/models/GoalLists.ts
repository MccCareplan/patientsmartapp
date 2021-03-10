/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { GoalSummary } from './GoalSummary';
import type { GoalTarget } from './GoalTarget';

export type GoalLists = {
    allGoals?: Array<GoalSummary>;
    activeClinicalGoals?: Array<GoalSummary>;
    inactiveClinicalGoals?: Array<GoalSummary>;
    activePatientGoals?: Array<GoalSummary>;
    inactivePatientGoals?: Array<GoalSummary>;
    activeTargets?: Array<GoalTarget>;
}
