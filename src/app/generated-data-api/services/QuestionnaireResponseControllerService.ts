/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { request as __request } from '../core/request';

export class QuestionnaireResponseControllerService {

    /**
     * @param subject
     * @returns any OK
     * @throws ApiError
     */
    public static async getQuestionnaireResponseSummary(
        subject: string,
    ): Promise<any> {
        const result = await __request({
            method: 'GET',
            path: `/summary/questionnaireresponses`,
            query: {
                'subject': subject,
            },
        });
        return result.body;
    }

    /**
     * @param subject
     * @returns any OK
     * @throws ApiError
     */
    public static async getQuestionnaireResponses(
        subject: string,
    ): Promise<any> {
        const result = await __request({
            method: 'GET',
            path: `/questionnaireresponse`,
            query: {
                'subject': subject,
            },
        });
        return result.body;
    }

    /**
     * @param id
     * @returns any OK
     * @throws ApiError
     */
    public static async getQuestionnaireResponse(
        id: string,
    ): Promise<any> {
        const result = await __request({
            method: 'GET',
            path: `/questionnaireresponse/${id}`,
        });
        return result.body;
    }

    /**
     * @param subject
     * @param code
     * @returns any OK
     * @throws ApiError
     */
    public static async getLatestQuestionnaireResponseForItem(
        subject: string,
        code: string,
    ): Promise<any> {
        const result = await __request({
            method: 'GET',
            path: `/find/latest/questionnaireresponseitem`,
            query: {
                'subject': subject,
                'code': code,
            },
        });
        return result.body;
    }

    /**
     * @param subject
     * @param code
     * @returns any OK
     * @throws ApiError
     */
    public static async getLatestQuestionnaireResponse(
        subject: string,
        code: string,
    ): Promise<any> {
        const result = await __request({
            method: 'GET',
            path: `/find/latest/questionnaireresponse`,
            query: {
                'subject': subject,
                'code': code,
            },
        });
        return result.body;
    }

    /**
     * @param subject
     * @param code
     * @param count
     * @param sort
     * @returns any OK
     * @throws ApiError
     */
    public static async getLatestQuestionnaireResponsesForItem(
        subject: string,
        code: string,
        count: number = 100,
        sort: string = 'descending',
    ): Promise<any> {
        const result = await __request({
            method: 'GET',
            path: `/find/all/questionnaireresponseitems`,
            query: {
                'subject': subject,
                'code': code,
                'count': count,
                'sort': sort,
            },
        });
        return result.body;
    }

}