/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import { MccCodeableConcept } from './MccCodeableConcept';
import { MccQuantity } from './MccQuantity';
import { MccRange } from './MccRange';
import { MccRatio } from './MccRatio';
import { MccSimpleQuantity } from './MccSimpleQuantity';

export interface DoseAndRate {
    type?: MccCodeableConcept;
    doseRange?: MccRange;
    doseQuantity?: MccQuantity;
    rateRatio?: MccRatio;
    rateRange?: MccRange;
    rateQuantity?: MccSimpleQuantity;
}
