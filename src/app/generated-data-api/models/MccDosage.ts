/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { DoseAndRate } from './DoseAndRate';
import type { MccCodeableConcept } from './MccCodeableConcept';
import type { MccRatio } from './MccRatio';
import type { MccSimpleQuantity } from './MccSimpleQuantity';
import type { MccTiming } from './MccTiming';

export type MccDosage = {
    sequence?: number;
    text?: string;
    patientInstructions?: string;
    additionInstructions?: Array<MccCodeableConcept>;
    timing?: MccTiming;
    asNeededBoolean?: boolean;
    asNeededCodableConcept?: MccCodeableConcept;
    site?: MccCodeableConcept;
    route?: MccCodeableConcept;
    method?: MccCodeableConcept;
    doseAndRate?: Array<DoseAndRate>;
    maxDosePerPeriod?: MccRatio;
    maxDosePerAdministration?: MccSimpleQuantity;
    maxDosePerLifetime?: MccSimpleQuantity;
}
