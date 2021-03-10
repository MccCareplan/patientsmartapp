/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { MccCodeableConcept } from './MccCodeableConcept';
import type { MccQuantity } from './MccQuantity';
import type { MccRange } from './MccRange';
import type { MccRatio } from './MccRatio';
import type { MccSimpleQuantity } from './MccSimpleQuantity';

export type DoseAndRate = {
    type?: MccCodeableConcept;
    doseRange?: MccRange;
    doseQuantity?: MccQuantity;
    rateRatio?: MccRatio;
    rateRange?: MccRange;
    rateQuantity?: MccSimpleQuantity;
}
