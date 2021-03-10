/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { MccCodeableConcept } from './MccCodeableConcept';

export type ConditionHistory = {
    code: MccCodeableConcept;
    onset?: string;
    abatement?: string;
    clinicalStatus: string;
    verificationStatus: string;
    categories?: string;
    fhirid?: string;
}
