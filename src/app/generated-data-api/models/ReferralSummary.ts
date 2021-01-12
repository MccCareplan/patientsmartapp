/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import { MccCodeableConcept } from './MccCodeableConcept';

export interface ReferralSummary {
    purpose?: MccCodeableConcept;
    date?: Date;
    displayDate?: string;
    referrer?: string;
    receiver?: string;
    status?: string;
    fhirid?: string;
}
