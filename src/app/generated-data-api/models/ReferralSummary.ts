/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { GenericType } from './GenericType';
import type { MccCodeableConcept } from './MccCodeableConcept';

export type ReferralSummary = {
    purpose: MccCodeableConcept;
    date?: GenericType;
    displayDate: string;
    referrer: string;
    receiver: string;
    status: string;
    performerType: MccCodeableConcept;
    fhirid?: string;
}
