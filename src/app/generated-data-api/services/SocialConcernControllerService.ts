/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import { catchGenericError } from '../core/ApiError';
import { request as __request } from '../core/request';

export class SocialConcernControllerService {

    /**
     * @param subject
     * @result any OK
     * @throws ApiError
     */
    public static async getCarePlans(
        subject: string,
    ): Promise<any> {

        const result = await __request({
            method: 'get',
            path: `/socialconcerns`,
            query: {
                'subject': subject,
            },
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
    public static async getConditionSummary(
        subject: string,
        careplan?: string,
    ): Promise<any> {

        const result = await __request({
            method: 'get',
            path: `/socialconcernsummary`,
            query: {
                'subject': subject,
                'careplan': careplan,
            },
        });

        catchGenericError(result);

        return result.body;
    }

}