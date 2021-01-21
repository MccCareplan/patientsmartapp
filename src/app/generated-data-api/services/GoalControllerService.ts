/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import { catchGenericError } from '../core/ApiError';
import { request as __request } from '../core/request';

export class GoalControllerService {

    /**
     * @param subject
     * @param careplan
     * @result any OK
     * @throws ApiError
     */
    public static async getGoalSummary(
        subject: string,
        careplan?: string,
    ): Promise<any> {

        const result = await __request({
            method: 'get',
            path: `/summary/goals`,
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
    public static async getGoalSummaryOld(
        subject: string,
        careplan?: string,
    ): Promise<any> {

        const result = await __request({
            method: 'get',
            path: `/goalsummary`,
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
     * @result any OK
     * @throws ApiError
     */
    public static async getGoals(
        subject: string,
    ): Promise<any> {

        const result = await __request({
            method: 'get',
            path: `/goal`,
            query: {
                'subject': subject,
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
    public static async getGoal(
        id: string,
    ): Promise<any> {

        const result = await __request({
            method: 'get',
            path: `/goal/${id}`,
        });

        catchGenericError(result);

        return result.body;
    }

}