/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import { MccCoding, MccObservation } from 'src/app/generated-data-api';

export interface ObservationList {
    primaryCode?: MccCoding;
    observations?: Array<MccObservation>;
}
