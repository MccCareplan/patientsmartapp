/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import { catchGenericError } from '../core/ApiError';
import { request as __request } from '../core/request';

export class ObservationControllerService {

    /**
     * @param subject
     * @param code
     * @param count
     * @param sort
     * @param mode
     * @result any OK
     * @throws ApiError
     */
    public static async getObservation(
        subject: string,
        code: string,
        count: number = 100,
        sort: string = 'ascending',
        mode: string = 'code',
    ): Promise<any> {

        const result = await __request({
            method: 'get',
            path: `/observations`,
            query: {
                'subject': subject,
                'code': code,
                'count': count,
                'sort': sort,
                'mode': mode,
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
     * @param mode
     * @result any OK
     * @throws ApiError
     */
    public static async getObservationsByValueSet(
        subject: string,
        valueset: string,
        max: number = 100,
        sort: string = 'ascending',
        mode: string = 'code',
    ): Promise<any> {

        const result = await __request({
            method: 'get',
            path: `/observationsbyvalueset`,
            query: {
                'subject': subject,
                'valueset': valueset,
                'max': max,
                'sort': sort,
                'mode': mode,
            },
        });

        catchGenericError(result);

        return result.body;
    }

    /**
     * @param subject
     * @param code
     * @param mode
     * @param translate
     * @result any OK
     * @throws ApiError
     */
    public static async getLatestObservation(
        subject: string,
        code: string,
        mode: string = 'code',
        translate: string = 'false',
    ): Promise<any> {

        const result = await __request({
            method: 'get',
            path: `/find/latest/observation`,
            query: {
                'subject': subject,
                'code': code,
                'mode': mode,
                'translate': translate,
            },
        });

        catchGenericError(result);

        return result.body;
    }

}