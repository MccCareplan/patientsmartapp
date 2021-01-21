/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import { MccPeriod } from './MccPeriod';

export interface MccCarePlanSummary {
    profiles: Array<string>;
    created?: string;
    lastUpdated?: string;
    period?: MccPeriod;
    fhirid?: string;
}
