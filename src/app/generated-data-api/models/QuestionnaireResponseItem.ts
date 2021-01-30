/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import { QuestionnaireResponseItemAnswer } from './QuestionnaireResponseItemAnswer';

export interface QuestionnaireResponseItem {
    linkid: string;
    text?: string;
    answers?: Array<QuestionnaireResponseItemAnswer>;
}
