/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import { catchGenericError } from '../core/ApiError';
import { request as __request } from '../core/request';

export class ObservationControllerService {

    /**
     * @param subject
     * @param code
     * @param max
     * @param sort
     * @result any OK
     * @throws ApiError
     */
    public static async getObservation(
        subject: string,
        code: string,
        max: number = 100,
        sort: string = 'ascending',
    ): Promise<any> {

        const result = await __request({
            method: 'get',
            path: `/observations`,
            query: {
                'subject': subject,
                'code': code,
                'max': max,
                'sort': sort,
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
    public static async getLatestObservation(
        subject: string,
        code: string,
    ): Promise<any> {

        const result = await __request({
            method: 'get',
            path: `/find/latest/observation`,
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
     * @param valueset
     * @param max
     * @param sort
     * @result any OK
     * @throws ApiError
     */
    public static async getObservationsByValueSet(
        subject: string,
        valueset: string,
        max: number = 100,
        sort: string = 'ascending',
    ): Promise<any> {

        const result = await __request({
            method: 'get',
            path: `/observationsbyvalueset`,
            query: {
                'subject': subject,
                'valueset': valueset,
                'max': max,
                'sort': sort,
            },
        });

        catchGenericError(result);

        return result.body;
    }

}