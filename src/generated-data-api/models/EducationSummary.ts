/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import { MccCodeableConcept } from "src/app/generated-data-api";

export interface EducationSummary {
    topic?: MccCodeableConcept;
    type?: string;
    displayDate?: string;
    date?: Date;
    outcome?: MccCodeableConcept;
    status?: string;
    fhirid?: string;
}
