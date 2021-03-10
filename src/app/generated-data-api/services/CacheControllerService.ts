/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { request as __request } from '../core/request';

export class CacheControllerService {

    /**
     * @returns any OK
     * @throws ApiError
     */
    public static async clearAllCaches(): Promise<any> {
        const result = await __request({
            method: 'DELETE',
            path: `/cache`,
        });
        return result.body;
    }

    /**
     * @returns any OK
     * @throws ApiError
     */
    public static async clearCachedValueSets(): Promise<any> {
        const result = await __request({
            method: 'DELETE',
            path: `/cache/valuesets`,
        });
        return result.body;
    }

    /**
     * @returns any OK
     * @throws ApiError
     */
    public static async clearCachedReferences(): Promise<any> {
        const result = await __request({
            method: 'DELETE',
            path: `/cache/references`,
        });
        return result.body;
    }

    /**
     * @returns any OK
     * @throws ApiError
     */
    public static async clearCachedQuestionnaires(): Promise<any> {
        const result = await __request({
            method: 'DELETE',
            path: `/cache/questionnaires`,
        });
        return result.body;
    }

    /**
     * @returns any OK
     * @throws ApiError
     */
    public static async clearQueryMappings(): Promise<any> {
        const result = await __request({
            method: 'DELETE',
            path: `/cache/querymappings`,
        });
        return result.body;
    }

}