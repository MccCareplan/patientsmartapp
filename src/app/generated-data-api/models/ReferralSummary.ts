/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import { GenericType } from './GenericType';
import { MccCodeableConcept } from './MccCodeableConcept';

export interface ReferralSummary {
    purpose: MccCodeableConcept;
    date?: GenericType;
    displayDate: string;
    referrer: string;
    receiver: string;
    status: string;
    performerType: MccCodeableConcept;
    fhirid?: string;
}
