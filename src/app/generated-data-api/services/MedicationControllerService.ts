/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import { catchGenericError } from '../core/ApiError';
import { request as __request } from '../core/request';

export class MedicationControllerService {

    /**
     * @param type
     * @param id
     * @result any OK
     * @throws ApiError
     */
    public static async getMedication(
        type: string,
        id: string,
    ): Promise<any> {

        const result = await __request({
            method: 'get',
            path: `/medication`,
            query: {
                'type': type,
                'id': id,
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
    public static async getMedicationLists(
        subject: string,
        careplan?: string,
    ): Promise<any> {

        const result = await __request({
            method: 'get',
            path: `/medicationlists`,
            query: {
                'subject': subject,
                'careplan': careplan,
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
    public static async getMedicationSummary(
        subject: string,
        careplan?: string,
    ): Promise<any> {

        const result = await __request({
            method: 'get',
            path: `/summary/medications`,
            query: {
                'subject': subject,
                'careplan': careplan,
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
    public static async getMedicationSummaryOld(
        subject: string,
        careplan?: string,
    ): Promise<any> {

        const result = await __request({
            method: 'get',
            path: `/medicationsummary`,
            query: {
                'subject': subject,
                'careplan': careplan,
            },
        });

        catchGenericError(result);

        return result.body;
    }

}