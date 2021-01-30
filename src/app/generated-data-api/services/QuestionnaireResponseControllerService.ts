/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import { catchGenericError } from '../core/ApiError';
import { request as __request } from '../core/request';

export class QuestionnaireResponseControllerService {

    /**
     * @param subject
     * @param code
     * @result any OK
     * @throws ApiError
     */
    public static async getLatestQuestionnaireResponse(
        subject: string,
        code: string,
    ): Promise<any> {

        const result = await __request({
            method: 'get',
            path: `/find/latest/questionnaireresponse`,
            query: {
                'subject': subject,
                'code': code,
            },
        });

        catchGenericError(result);

        return result.body;
    }

    /**
     * @param subject
     * @param code
     * @result any OK
     * @throws ApiError
     */
    public static async getLatestQuestionnaireResponseForItem(
        subject: string,
        code: string,
    ): Promise<any> {

        const result = await __request({
            method: 'get',
            path: `/find/latest/questionnaireresponseitem`,
            query: {
                'subject': subject,
                'code': code,
            },
        });

        catchGenericError(result);

        return result.body;
    }

    /**
     * @param subject
     * @result any OK
     * @throws ApiError
     */
    public static async getQuestionnaireResponseSummary(
        subject: string,
    ): Promise<any> {

        const result = await __request({
            method: 'get',
            path: `/summary/questionnaireresponses`,
            query: {
                'subject': subject,
            },
        });

        catchGenericError(result);

        return result.body;
    }

    /**
     * @param id
     * @result any OK
     * @throws ApiError
     */
    public static async getQuestionnaireResponse(
        id: string,
    ): Promise<any> {

        const result = await __request({
            method: 'get',
            path: `/questionnaireresponse/${id}`,
        });

        catchGenericError(result);

        return result.body;
    }

    /**
     * @param subject
     * @result any OK
     * @throws ApiError
     */
    public static async getQuestionnaireResponses(
        subject: string,
    ): Promise<any> {

        const result = await __request({
            method: 'get',
            path: `/questionnaireresponse`,
            query: {
                'subject': subject,
            },
        });

        catchGenericError(result);

        return result.body;
    }

}