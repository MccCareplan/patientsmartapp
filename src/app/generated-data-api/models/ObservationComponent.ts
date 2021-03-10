/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { GenericType } from './GenericType';
import type { MccCodeableConcept } from './MccCodeableConcept';
import type { ReferenceRange } from './ReferenceRange';

export type ObservationComponent = {
    code: MccCodeableConcept;
    value: GenericType;
    interpretation?: Array<MccCodeableConcept>;
    dataAbsentReason?: MccCodeableConcept;
    referenceRanges?: Array<ReferenceRange>;
}
