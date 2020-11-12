/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import { MccCodeableConcept } from './MccCodeableConcept';

export interface ConditionHistory {
    code?: MccCodeableConcept;
    onset?: string;
    abatement?: string;
    clinicalStatus?: string;
    verificationStatus?: string;
    categories?: string;
    fhirid?: string;
}
