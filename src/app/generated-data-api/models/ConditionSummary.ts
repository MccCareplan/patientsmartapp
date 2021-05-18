/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ConditionHistory } from './ConditionHistory';
import type { MccCodeableConcept } from './MccCodeableConcept';

export type ConditionSummary = {
    code: MccCodeableConcept;
    categories?: string;
    history: Array<ConditionHistory>;
    profileId?: string;
    firstRecorded?: string;
    firstRecordedAsText?: string;
    firstOnset?: string;
    clinicalStatus?: string;
    verificationStatus?: string;
}
