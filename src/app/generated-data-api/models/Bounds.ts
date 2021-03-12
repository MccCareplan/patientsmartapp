/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { MccDuration } from './MccDuration';
import type { MccPeriod } from './MccPeriod';
import type { MccRange } from './MccRange';

export type Bounds = {
    type?: string;
    range?: MccRange;
    period?: MccPeriod;
    duration?: MccDuration;
}
