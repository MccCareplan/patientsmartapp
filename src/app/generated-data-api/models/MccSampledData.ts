/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { MccSimpleQuantity } from './MccSimpleQuantity';

export type MccSampledData = {
    origin?: MccSimpleQuantity;
    period?: number;
    factor?: number;
    lowerlimit?: number;
    upperlimit?: number;
    dimensions?: number;
    data?: string;
}
