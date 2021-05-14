/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { MccDate } from './MccDate';
import type { QuestionnaireResponseItem } from './QuestionnaireResponseItem';

export type SimpleQuestionnaireItem = {
    type?: string;
    authored?: MccDate;
    item?: QuestionnaireResponseItem;
    fhirid?: string;
}
