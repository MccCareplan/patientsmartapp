/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { MccDateTime } from './MccDateTime';
import type { MccInstant } from './MccInstant';
import type { MccPeriod } from './MccPeriod';
import type { MccTiming } from './MccTiming';

export type Effective = {
    type?: string;
    dateTime?: MccDateTime;
    period?: MccPeriod;
    timing?: MccTiming;
    instant?: MccInstant;
}
