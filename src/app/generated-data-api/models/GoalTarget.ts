/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { GenericType } from './GenericType';
import type { MccCodeableConcept } from './MccCodeableConcept';
import type { MccDate } from './MccDate';
import type { MccDuration } from './MccDuration';

export type GoalTarget = {
    measure: MccCodeableConcept;
    value?: GenericType;
    dueType?: string;
    due?: string;
    dueAsText?: string;
    dueDuration?: MccDuration;
    dueDate?: MccDate;
}
