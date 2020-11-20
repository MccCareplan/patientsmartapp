/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import { MccCodeableConcept } from './MccCodeableConcept';
import { MccPeriod } from './MccPeriod';
import { MccReference } from './MccReference';

export interface MccIdentifer {
    use?: string;
    type?: MccCodeableConcept;
    system?: string;
    value?: string;
    period?: MccPeriod;
    assigner?: MccReference;
}
