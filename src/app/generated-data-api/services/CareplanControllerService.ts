/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { request as __request } from '../core/request';

export class CareplanControllerService {

    /**
     * @param subject
     * @returns any OK
     * @throws ApiError
     */
    public static async getSupportedCarePlans(
        subject: string,
    ): Promise<any> {
        const result = await __request({
            method: 'GET',
            path: `/find/supported/careplans`,
            query: {
                'subject': subject,
            },
        });
        return result.body;
    }

    /**
     * @param subject
     * @param matchScheme
     * @returns any OK
     * @throws ApiError
     */
    public static async getBest(
        subject: string,
        matchScheme: string = 'profiles',
    ): Promise<any> {
        const result = await __request({
            method: 'GET',
            path: `/find/best/careplan`,
            query: {
                'subject': subject,
                'matchScheme': matchScheme,
            },
        });
        return result.body;
    }

    /**
     * @param subject
     * @returns any OK
     * @throws ApiError
     */
    public static async getCarePlans1(
        subject: string,
    ): Promise<any> {
        const result = await __request({
            method: 'GET',
            path: `/careplan`,
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
    public static async getCareplan(
        id: string,
    ): Promise<any> {
        const result = await __request({
            method: 'GET',
            path: `/careplan/${id}`,
        });
        return result.body;
    }

}