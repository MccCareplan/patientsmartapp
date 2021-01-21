/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import { FuzzyDate } from './FuzzyDate';
import { MccCodeableConcept } from './MccCodeableConcept';

export interface CounselingSummary {
    topic: MccCodeableConcept;
    type: string;
    displayDate?: string;
    date?: FuzzyDate;
    outcome?: MccCodeableConcept;
    status: string;
    performer?: string;
    reasons?: string;
    fhirid?: string;
}
