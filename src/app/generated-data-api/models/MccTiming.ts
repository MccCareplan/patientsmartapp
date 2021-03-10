/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { MccCodeableConcept } from './MccCodeableConcept';
import type { MccDateTime } from './MccDateTime';
import type { Repeat } from './Repeat';

export type MccTiming = {
    event?: Array<MccDateTime>;
    code?: MccCodeableConcept;
    repeat?: Repeat;
    readable: string;
}
