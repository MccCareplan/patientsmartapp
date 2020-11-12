/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import { catchGenericError } from '../core/ApiError';
import { request as __request } from '../core/request';

export class PatientControllerService {

    /**
     * @param name
     * @result any OK
     * @throws ApiError
     */
    public static async getPatients(
        name: string,
    ): Promise<any> {

        const result = await __request({
            method: 'get',
            path: `/patient`,
            query: {
                'name': name,
            },
        });

        catchGenericError(result);

        return result.body;
    }

    /**
     * @param id
     * @result any OK
     * @throws ApiError
     */
    public static async getPatient(
        id: string,
    ): Promise<any> {

        const result = await __request({
            method: 'get',
            path: `/patient/${id}`,
        });

        catchGenericError(result);

        return result.body;
    }

}