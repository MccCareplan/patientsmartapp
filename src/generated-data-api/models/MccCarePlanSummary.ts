/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import { MccPeriod } from "src/app/generated-data-api";

export interface MccCarePlanSummary {
    profiles?: string[];
    created?: string;
    lastUpdated?: string;
    period?: MccPeriod;
    fhirid?: string;
}