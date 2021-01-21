/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import { GenericType } from './GenericType';
import { MccCodeableConcept } from './MccCodeableConcept';
import { ReferenceRange } from './ReferenceRange';

export interface ObservationComponent {
    code: MccCodeableConcept;
    value: GenericType;
    interpretation?: Array<MccCodeableConcept>;
    dataAbsentReason?: MccCodeableConcept;
    referenceRanges?: Array<ReferenceRange>;
}
