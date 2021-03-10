/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { request as __request } from '../core/request';

export class CounselingControllerService {

    /**
     * @param subject
     * @param careplan
     * @returns any OK
     * @throws ApiError
     */
    public static async getCounselingSummary1(
        subject: string,
        careplan?: string,
    ): Promise<any> {
        const result = await __request({
            method: 'GET',
            path: `/summary/counselings`,
            query: {
                'subject': subject,
                'careplan': careplan,
            },
        });
        return result.body;
    }

}