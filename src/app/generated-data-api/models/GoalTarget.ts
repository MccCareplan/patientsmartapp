/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import { GenericType } from './GenericType';
import { MccCodeableConcept } from './MccCodeableConcept';
import { MccDate } from './MccDate';
import { MccDuration } from './MccDuration';

export interface GoalTarget {
    measure: MccCodeableConcept;
    value?: GenericType;
    dueType?: string;
    due?: string;
    dueAsText?: string;
    dueDuration?: MccDuration;
    dueDate?: MccDate;
}
