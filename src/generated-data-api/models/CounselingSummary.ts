/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import { MccCodeableConcept } from "src/app/generated-data-api";

export interface CounselingSummary {
    topic?: MccCodeableConcept;
    type?: string
    displayDate?: string;
    date?: Date;
    outcome?: MccCodeableConcept;
    status?: string;
    fhirid?: string;
}