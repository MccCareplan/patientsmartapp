/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import { MccDateTime } from './MccDateTime';
import { MccInstant } from './MccInstant';
import { MccPeriod } from './MccPeriod';
import { MccTiming } from './MccTiming';

export interface Effective {
    type?: string;
    dateTime?: MccDateTime;
    period?: MccPeriod;
    timing?: MccTiming;
    instant?: MccInstant;
}
