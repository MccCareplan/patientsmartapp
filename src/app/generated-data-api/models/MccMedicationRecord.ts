/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { MccCodeableConcept } from './MccCodeableConcept';
import type { MccDosage } from './MccDosage';
import type { MccReference } from './MccReference';

export type MccMedicationRecord = {
    type: string;
    fhirId: string;
    inConflict?: boolean;
    conflictsWith?: Array<string>;
    status: string;
    statusReasons?: Array<MccCodeableConcept>;
    categories?: Array<MccCodeableConcept>;
    medication?: MccCodeableConcept;
    reasons?: Array<MccCodeableConcept>;
    dosages?: Array<MccDosage>;
    note?: string;
    informationSource?: MccReference;
    priority?: string;
    requester?: MccReference;
    reasonReferences?: Array<MccReference>;
    detectedIssues?: Array<MccReference>;
    onCareplans?: string;
}
