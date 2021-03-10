/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import { MccCoding, MccObservation } from 'src/app/generated-data-api';
import { GenericType } from './GenericType';
import { MccCodeableConcept } from './MccCodeableConcept';
import { ReferenceRange } from './ReferenceRange';

export interface ObservationList {
    primaryCode?: MccCoding;
    observations?: Array<MccObservation>;
}
