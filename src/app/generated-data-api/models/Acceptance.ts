/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import { MccCodeableConcept } from './MccCodeableConcept';
import { MccReference } from './MccReference';

export interface Acceptance {
    individual?: MccReference;
    code?: string;
    priority?: MccCodeableConcept;
}
