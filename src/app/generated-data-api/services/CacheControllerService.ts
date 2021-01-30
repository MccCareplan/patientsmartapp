/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import { catchGenericError } from '../core/ApiError';
import { request as __request } from '../core/request';

export class CacheControllerService {

    /**
     * @result any OK
     * @throws ApiError
     */
    public static async clearAllCaches(): Promise<any> {

        const result = await __request({
            method: 'delete',
            path: `/cache`,
        });

        catchGenericError(result);

        return result.body;
    }

    /**
     * @result any OK
     * @throws ApiError
     */
    public static async clearCachedQuestionnaires(): Promise<any> {

        const result = await __request({
            method: 'delete',
            path: `/cache/questionnaires`,
        });

        catchGenericError(result);

        return result.body;
    }

    /**
     * @result any OK
     * @throws ApiError
     */
    public static async clearCachedReferences(): Promise<any> {

        const result = await __request({
            method: 'delete',
            path: `/cache/references`,
        });

        catchGenericError(result);

        return result.body;
    }

    /**
     * @result any OK
     * @throws ApiError
     */
    public static async clearCachedValueSets(): Promise<any> {

        const result = await __request({
            method: 'delete',
            path: `/cache/valuesets`,
        });

        catchGenericError(result);

        return result.body;
    }

    /**
     * @result any OK
     * @throws ApiError
     */
    public static async clearQueryMappings(): Promise<any> {

        const result = await __request({
            method: 'delete',
            path: `/cache/querymappings`,
        });

        catchGenericError(result);

        return result.body;
    }

}