/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { request as __request } from '../core/request';

export class PatientControllerService {

    /**
     * @param name
     * @returns any OK
     * @throws ApiError
     */
    public static async getPatients(
        name: string,
    ): Promise<any> {
        const result = await __request({
            method: 'GET',
            path: `/patient`,
            query: {
                'name': name,
            },
        });
        return result.body;
    }

    /**
     * @param id
     * @returns any OK
     * @throws ApiError
     */
    public static async getPatient(
        id: string,
    ): Promise<any> {
        const result = await __request({
            method: 'GET',
            path: `/patient/${id}`,
        });
        return result.body;
    }

}