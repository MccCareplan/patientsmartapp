/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { MccCodeableConcept } from './MccCodeableConcept';
import type { MccCondition } from './MccCondition';

export type MccCarePlan = {
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
