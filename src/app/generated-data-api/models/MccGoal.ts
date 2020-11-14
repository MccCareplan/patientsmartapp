/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import { GoalTarget } from './GoalTarget';
import { MccCodeableConcept } from './MccCodeableConcept';
import { MccDate } from './MccDate';
import { MccReference } from './MccReference';

export interface MccGoal {
    id?: string;
    statusDate?: string;
    statusReason?: string;
    lifecycleStatus?: string;
    categorySummary?: string;
    expressedBy?: MccReference;
    categories?: Array<MccCodeableConcept>;
    priority?: MccCodeableConcept;
    description?: MccCodeableConcept;
    useStartConcept?: boolean;
    startDateText?: string;
    startConcept?: MccCodeableConcept;
    startDate?: MccDate;
    targets?: Array<GoalTarget>;
    addresses?: Array<MccReference>;
    notes?: Array<string>;
    outcomeCodes?: Array<MccCodeableConcept>;
    outcomeReference?: string;
    fhirid?: string;
}
