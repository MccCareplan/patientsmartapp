/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { MccCodeableConcept } from './MccCodeableConcept';
import type { MccReference } from './MccReference';

export type Acceptance = {
    individual?: MccReference;
    code?: string;
    priority?: MccCodeableConcept;
}
