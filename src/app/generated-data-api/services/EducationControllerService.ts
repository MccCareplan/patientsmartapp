/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { request as __request } from '../core/request';

export class EducationControllerService {

    /**
     * @param subject
     * @param careplan
     * @returns any OK
     * @throws ApiError
     */
    public static async getEducationSummary(
        subject: string,
        careplan?: string,
    ): Promise<any> {
        const result = await __request({
            method: 'GET',
            path: `/summary/educations`,
            query: {
                'subject': subject,
                'careplan': careplan,
            },
        });
        return result.body;
    }

}