/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import { MccMedicationRecord } from './MccMedicationRecord';

export interface MedicationLists {
    activeMedications?: Array<MccMedicationRecord>;
    inactiveMedications?: Array<MccMedicationRecord>;
}
