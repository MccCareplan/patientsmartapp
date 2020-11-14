/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import { catchGenericError } from '../core/ApiError';
import { request as __request } from '../core/request';

export class ContactControllerService {

    /**
     * @param subject
     * @param careplan
     * @result any OK
     * @throws ApiError
     */
    public static async getContacts(
        subject: string,
        careplan?: string,
    ): Promise<any> {

        const result = await __request({
            method: 'get',
            path: `/contact`,
            query: {
                'subject': subject,
                'careplan': careplan,
            },
        });

        catchGenericError(result);

        return result.body;
    }

}