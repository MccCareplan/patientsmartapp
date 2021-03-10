/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { MccPeriod } from './MccPeriod';

export type MccCarePlanSummary = {
    profiles: Array<string>;
    created?: string;
    lastUpdated?: string;
    period?: MccPeriod;
    fhirid?: string;
}
