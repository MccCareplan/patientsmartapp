/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { request as __request } from '../core/request';

export class ContactControllerService {

    /**
     * @param id
     * @returns any OK
     * @throws ApiError
     */
    public static async getImage(
        id: string,
    ): Promise<any> {
        const result = await __request({
            method: 'GET',
            path: `/image/contact/${id}`,
        });
        return result.body;
    }

    /**
     * @param subject
     * @param careplan
     * @returns any OK
     * @throws ApiError
     */
    public static async getContacts(
        subject: string,
        careplan?: string,
    ): Promise<any> {
        const result = await __request({
            method: 'GET',
            path: `/contact`,
            query: {
                'subject': subject,
                'careplan': careplan,
            },
        });
        return result.body;
    }

}