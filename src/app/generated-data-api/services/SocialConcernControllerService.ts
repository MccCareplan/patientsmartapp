/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { request as __request } from '../core/request';

export class SocialConcernControllerService {

    /**
     * @param subject
     * @param careplan
     * @returns any OK
     * @throws ApiError
     */
    public static async getConditionSummary1(
        subject: string,
        careplan?: string,
    ): Promise<any> {
        const result = await __request({
            method: 'GET',
            path: `/socialconcernsummary`,
            query: {
                'subject': subject,
                'careplan': careplan,
            },
        });
        return result.body;
    }

    /**
     * @param subject
     * @returns any OK
     * @throws ApiError
     */
    public static async getCarePlans(
        subject: string,
    ): Promise<any> {
        const result = await __request({
            method: 'GET',
            path: `/socialconcerns`,
            query: {
                'subject': subject,
            },
        });
        return result.body;
    }

}