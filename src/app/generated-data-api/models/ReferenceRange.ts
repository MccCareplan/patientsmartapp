/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import { MccCodeableConcept } from './MccCodeableConcept';
import { MccQuantity } from './MccQuantity';
import { MccRange } from './MccRange';

export interface ReferenceRange {
    low?: MccQuantity;
    high?: MccQuantity;
    type?: MccCodeableConcept;
    appliesTo?: Array<MccCodeableConcept>;
    age?: MccRange;
    text?: string;
}
