/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import { Effective } from './Effective';
import { GenericType } from './GenericType';
import { MccCodeableConcept } from './MccCodeableConcept';
import { MccReference } from './MccReference';
import { ObservationComponent } from './ObservationComponent';
import { ReferenceRange } from './ReferenceRange';

export interface MccObservation {
    code?: MccCodeableConcept;
    status?: string;
    basedOn?: Array<MccReference>;
    effective?: Effective;
    value?: GenericType;
    note?: string;
    referenceRanges?: Array<ReferenceRange>;
    components?: Array<ObservationComponent>;
    category?: Array<MccCodeableConcept>;
    dataAbsentReason?: MccCodeableConcept;
    fhirid?: string;
}
