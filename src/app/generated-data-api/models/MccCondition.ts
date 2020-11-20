/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import { MccCodeableConcept } from './MccCodeableConcept';
import { MccDate } from './MccDate';
import { MccIdentifer } from './MccIdentifer';
import { MccReference } from './MccReference';

export interface MccCondition {
    clinicalStatus?: MccCodeableConcept;
    verifiationStatus?: MccCodeableConcept;
    categories?: Array<MccCodeableConcept>;
    severity?: MccCodeableConcept;
    code?: MccCodeableConcept;
    onset?: string;
    abatement?: string;
    recordedDate?: MccDate;
    recorder?: MccReference;
    asserter?: MccReference;
    note?: string;
    profileId?: string;
    identifer?: Array<MccIdentifer>;
    fhirid?: string;
}
