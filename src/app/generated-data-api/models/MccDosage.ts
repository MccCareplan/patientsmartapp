/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import { DoseAndRate } from './DoseAndRate';
import { MccCodeableConcept } from './MccCodeableConcept';
import { MccRatio } from './MccRatio';
import { MccSimpleQuantity } from './MccSimpleQuantity';
import { MccTiming } from './MccTiming';

export interface MccDosage {
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
