/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { request as __request } from '../core/request';

export class MedicationControllerService {

    /**
     * @param subject
     * @param careplan
     * @returns any OK
     * @throws ApiError
     */
    public static async getMedicationSummary(
        subject: string,
        careplan?: string,
    ): Promise<any> {
        const result = await __request({
            method: 'GET',
            path: `/summary/medications`,
            query: {
                'subject': subject,
                'careplan': careplan,
            },
        });
        return result.body;
    }

    /**
     * @param subject
     * @param careplan
     * @returns any OK
     * @throws ApiError
     */
    public static async getMedicationSummaryOld(
        subject: string,
        careplan?: string,
    ): Promise<any> {
        const result = await __request({
            method: 'GET',
            path: `/medicationsummary`,
            query: {
                'subject': subject,
                'careplan': careplan,
            },
        });
        return result.body;
    }

    /**
     * @param subject
     * @param careplan
     * @returns any OK
     * @throws ApiError
     */
    public static async getMedicationLists(
        subject: string,
        careplan?: string,
    ): Promise<any> {
        const result = await __request({
            method: 'GET',
            path: `/medicationlists`,
            query: {
                'subject': subject,
                'careplan': careplan,
            },
        });
        return result.body;
    }

    /**
     * @param type
     * @param id
     * @returns any OK
     * @throws ApiError
     */
    public static async getMedication(
        type: string,
        id: string,
    ): Promise<any> {
        const result = await __request({
            method: 'GET',
            path: `/medication`,
            query: {
                'type': type,
                'id': id,
            },
        });
        return result.body;
    }

}