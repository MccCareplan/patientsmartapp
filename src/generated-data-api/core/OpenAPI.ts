/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

interface Config {
    BASE: string;
    VERSION: string;
    CLIENT: 'fetch' | 'xhr';
    WITH_CREDENTIALS: boolean;
    TOKEN: string;
}

export const OpenAPI: Config = {
    BASE: 'http://mcc-niddk-backend.wl.r.appspot.com',
    VERSION: '0',
    CLIENT: 'fetch',
    WITH_CREDENTIALS: false,
    TOKEN: '',
};