/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import { MccSimpleQuantity } from './MccSimpleQuantity';

export interface MccSampledData {
    origin?: MccSimpleQuantity;
    period?: number;
    factor?: number;
    lowerlimit?: number;
    upperlimit?: number;
    dimensions?: number;
    data?: string;
}
