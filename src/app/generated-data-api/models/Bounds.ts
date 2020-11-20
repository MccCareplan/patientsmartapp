/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import { MccDuration } from './MccDuration';
import { MccPeriod } from './MccPeriod';
import { MccRange } from './MccRange';

export interface Bounds {
    type?: string;
    range?: MccRange;
    period?: MccPeriod;
    duration?: MccDuration;
}
