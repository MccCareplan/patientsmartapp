/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import { MccDate } from './MccDate';
import { QuestionnaireResponseItem } from './QuestionnaireResponseItem';

export interface SimpleQuestionnaireItem {
    authored?: MccDate;
    item?: QuestionnaireResponseItem;
    fhirid?: string;
}
