/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import { Bounds } from './Bounds';
import { MccTime } from './MccTime';

export interface Repeat {
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
