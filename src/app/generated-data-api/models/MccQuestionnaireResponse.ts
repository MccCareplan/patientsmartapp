/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import { MccDate } from './MccDate';
import { QuestionnaireResponseItem } from './QuestionnaireResponseItem';

export interface MccQuestionnaireResponse {
    id: string;
    status?: string;
    authored?: MccDate;
    questionnaire?: string;
    author?: string;
    source?: string;
    subject?: string;
    items?: Array<QuestionnaireResponseItem>;
    fhirid?: string;
}
