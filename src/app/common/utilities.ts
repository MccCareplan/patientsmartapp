export class Utilities {
    public static getQueryStringParam = (key: string): string => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const value = urlParams.get(key);
        return value;
    }
}