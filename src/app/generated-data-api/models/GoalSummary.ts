/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import { GoalTarget } from './GoalTarget';
import { MccCodeableConcept } from './MccCodeableConcept';

export interface GoalSummary {
    priority: string;
    expressedByType?: string;
    description: string;
    achievementStatus?: MccCodeableConcept;
    achievementText?: string;
    lifecycleStatus: string;
    startDateText?: string;
    targetDateText?: string;
    addresses?: string;
    expressedBy?: string;
    acceptance?: string;
    targets?: Array<GoalTarget>;
    fhirid?: string;
}
