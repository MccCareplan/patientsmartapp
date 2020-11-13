/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import { catchGenericError } from '../core/ApiError';
import { request as __request } from '../core/request';

export class ConditionControllerService {

    /**
     * @param subject
     * @result any OK
     * @throws ApiError
     */
    public static async getConditions(
        subject: string,
    ): Promise<any> {

        const result = await __request({
            method: 'get',
            path: `/condition`,
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
    public static async getCodition(
        id: string,
    ): Promise<any> {

        const result = await __request({
            method: 'get',
            path: `/condition/${id}`,
        });

        catchGenericError(result);

        return result.body;
    }

    /**
     * @param subject
     * @param careplan
     * @result any OK
     * @throws ApiError
     */
    public static async getConditionSummary1(
        subject: string,
        careplan?: string,
    ): Promise<any> {

        const result = await __request({
            method: 'get',
            path: `/conditionsummary`,
            query: {
                'subject': subject,
                'careplan': careplan,
            },
        });

        catchGenericError(result);

        return result.body;
    }

}