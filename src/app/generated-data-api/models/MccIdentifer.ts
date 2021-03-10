/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { MccCodeableConcept } from './MccCodeableConcept';
import type { MccPeriod } from './MccPeriod';
import type { MccReference } from './MccReference';

export type MccIdentifer = {
    use?: string;
    type?: MccCodeableConcept;
    system?: string;
    value?: string;
    period?: MccPeriod;
    assigner?: MccReference;
}
