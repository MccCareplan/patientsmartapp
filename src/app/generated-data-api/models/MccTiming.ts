/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import { MccCodeableConcept } from './MccCodeableConcept';
import { MccDateTime } from './MccDateTime';
import { Repeat } from './Repeat';

export interface MccTiming {
    event?: Array<MccDateTime>;
    code?: MccCodeableConcept;
    repeat?: Repeat;
    readable?: string;
}
