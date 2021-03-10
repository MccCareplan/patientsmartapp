/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Bounds } from './Bounds';
import type { MccTime } from './MccTime';

export type Repeat = {
    bounds?: Bounds;
    count?: number;
    countMax?: number;
    duration?: string;
    durationMax?: string;
    durationUnit?: string;
    frequency?: number;
    frequencyMax?: number;
    period?: string;
    periodMax?: string;
    periodUnit?: string;
    dayOfWeek?: Array<string>;
    timeOfDay?: Array<MccTime>;
    when?: Array<string>;
    offset?: number;
    readable?: string;
}
