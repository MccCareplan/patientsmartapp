/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { MccCodeableConcept } from './MccCodeableConcept';
import type { MccQuantity } from './MccQuantity';
import type { MccRange } from './MccRange';

export type ReferenceRange = {
    low?: MccQuantity;
    high?: MccQuantity;
    type?: MccCodeableConcept;
    appliesTo?: Array<MccCodeableConcept>;
    age?: MccRange;
    text?: string;
}
