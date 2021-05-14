/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { request as __request } from '../core/request';

export class ObservationControllerService {

    /**
     * @param subject
     * @param valueset
     * @param max
     * @param sort
     * @param mode
     * @param requiredunit
     * @returns any OK
     * @throws ApiError
     */
    public static async getObservationsSegmented(
        subject: string,
        valueset: string,
        max: number = 1000,
        sort: string = 'ascending',
        mode: string = 'code',
        requiredunit?: string,
    ): Promise<any> {
        const result = await __request({
            method: 'GET',
            path: `/observationssegmented`,
            query: {
                'subject': subject,
                'valueset': valueset,
                'max': max,
                'sort': sort,
                'mode': mode,
                'requiredunit': requiredunit,
            },
        });
        return result.body;
    }

    /**
     * @param subject
     * @param valueset
     * @param max
     * @param sort
     * @param mode
     * @param requiredunit
     * @returns any OK
     * @throws ApiError
     */
    public static async getObservationsByValueSet(
        subject: string,
        valueset: string,
        max: number = 100,
        sort: string = 'ascending',
        mode: string = 'code',
        requiredunit?: string,
    ): Promise<any> {
        const result = await __request({
            method: 'GET',
            path: `/observationsbyvalueset`,
            query: {
                'subject': subject,
                'valueset': valueset,
                'max': max,
                'sort': sort,
                'mode': mode,
                'requiredunit': requiredunit,
            },
        });
        return result.body;
    }

    /**
     * @param subject
     * @param code
     * @param count
     * @param sort
     * @param mode
     * @param requiredunit
     * @returns any OK
     * @throws ApiError
     */
    public static async getObservation(
        subject: string,
        code: string,
        count: number = 100,
        sort: string = 'ascending',
        mode: string = 'code',
        requiredunit?: string,
    ): Promise<any> {
        const result = await __request({
            method: 'GET',
            path: `/observations`,
            query: {
                'subject': subject,
                'code': code,
                'count': count,
                'sort': sort,
                'mode': mode,
                'requiredunit': requiredunit,
            },
        });
        return result.body;
    }

    /**
     * @param subject
     * @param code
     * @param mode
     * @param translate
     * @param requiredunit
     * @returns any OK
     * @throws ApiError
     */
    public static async getLatestObservation(
        subject: string,
        code: string,
        mode: string = 'code',
        translate: string = 'false',
        requiredunit?: string,
    ): Promise<any> {
        const result = await __request({
            method: 'GET',
            path: `/find/latest/observation`,
            query: {
                'subject': subject,
                'code': code,
                'mode': mode,
                'translate': translate,
                'requiredunit': requiredunit,
            },
        });
        return result.body;
    }

}