/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import { MccCodeableConcept } from './MccCodeableConcept';
import { MccCondition } from './MccCondition';

export interface MccCarePlan {
    title?: string;
    dateLastRevised?: string;
    addresses?: Array<MccCondition>;
    addressesSummary?: string;
    categorySummary?: string;
    categories?: Array<MccCodeableConcept>;
    id?: string;
    periodStarts?: string;
    periodEnds?: string;
    status: string;
    intent: string;
    description?: string;
    notes?: string;
    dateResourceLastUpdated?: string;
    fhirid?: string;
}
