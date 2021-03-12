/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { MccMedicationRecord } from './MccMedicationRecord';

export type MedicationLists = {
    activeMedications: Array<MccMedicationRecord>;
    inactiveMedications: Array<MccMedicationRecord>;
}
