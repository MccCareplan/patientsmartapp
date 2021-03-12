/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { MedicationSummary } from './MedicationSummary';

export type MedicationSummaryList = {
    activeMedications: Array<MedicationSummary>;
    inactiveMedications: Array<MedicationSummary>;
}
