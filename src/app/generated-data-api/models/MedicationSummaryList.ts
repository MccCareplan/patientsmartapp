/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import { MedicationSummary } from './MedicationSummary';

export interface MedicationSummaryList {
    activeMedications?: Array<MedicationSummary>;
    inactiveMedications?: Array<MedicationSummary>;
}
