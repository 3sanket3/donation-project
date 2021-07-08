import axios from 'axios';
import { MESSAGES } from '../constants/messages';

/**
 * Cancel Token
 */
const { CancelToken } = axios;
/**
 * Use to cancel Http Requests
 */
let cancelHttpTokens = [];
/**
 * Helper Params used in Request
 */
const HELPER_PARAMS = {
    callback: null, // Function|Null
    headers: {}, // Additional Headers
    traceName: 'untraced_event',
};
/**
 * Get Common Headers
 *
 * @param {String} url
 * @param {Object} additional_headers
 *
 * @return {Object} Headers
 */
export const getCommonHeaders = (url: any, additional_headers = {}) => {
    try {
        const { traceName }: any = additional_headers;
        const light_step_headers = {
            'x-api-trace-name': traceName,
        };

        let headers = {
            Accept: 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Cache-Control': 'no-cache',
            ...light_step_headers,
        };

        headers = { ...headers, ...additional_headers };

        return headers;
    } catch (e) {
        return {};
    }
};
/**
 * Extract JSON Response
 *
 * @param {JSON} json [JSON Data]
 *
 * @return {Object|String} Extarcted value or Blank Object
 */
export const extractJSON = (json: any) => {
    try {
        return JSON.parse(json);
    } catch (err) {
        return '';
    }
};
/**
 * Handle Success Response
 *
 * @param {Object|Null} res
 *
 * @return {Object|Null}
 */
export const httpHandleResponse = (res: any) => {
    cancelHttpTokens = [];
    if (!res) return Promise.reject(null);
    const r = res.data;
    return Promise.resolve(r);
};
/**
 * Handle API Error Reponse
 *
 * @param {Object|Null} error
 *
 * @return {Object|String|Null}
 */
export const httpHandleError = (error: any) => {
    /* error = { error, config, code, request, response } */
    try {
        if (!error) return Promise.reject({});
        /* Handle Cancel Request */
        cancelHttpTokens = [];
        if (!error.request) return Promise.reject('cancelled');
        const xhr = error.response.data;
        let err: any = {};
        if (xhr) err = xhr;
        if (xhr) {
            switch (xhr.status) {
                case 0:
                    console.log(MESSAGES.SERVER_ERROR);
                    break;
                case 400:
                    if (err.error) {
                        console.log(err.error[0].message);
                    } else if (!err.status && !err.error && err.response) {
                        console.log(err.response);
                    } else {
                        console.log(MESSAGES.INTERNAL_ERROR);
                    }
                    break;
                case 401:
                    console.log(MESSAGES.UNAUTHORIZED);
                    break;
                case 403:
                    console.log(MESSAGES.UNAUTHORIZED);
                    break;
                case 404:
                    console.log(err.response);
                    break;
                case 412:
                    if (Object.keys(err.errors)[0] === 'q') {
                        console.log('Please enter valid location.');
                    } else {
                        console.log(err.errors[Object.keys(err.errors)[0]][0]);
                    }
                    break;
                case 422:
                    if (err.errors && err.errors[0] && err.errors[0].detail) {
                        console.log(err.errors[0].detail);
                    } else if (Array.isArray(err.message)) {
                        console.log(err.message[0]);
                    } else if (err.message) {
                        console.log(err.message);
                    } else if (err.error && typeof err.error == 'string') {
                        console.log(err.error);
                    } else {
                        console.log(err[Object.keys(err)[0]]);
                    }
                    break;
                case 502:
                    console.log(MESSAGES.BAD_GATEWAY);
                    break;
                case 503:
                    if (err.error && typeof err.error == 'string') {
                        console.log(err.error);
                    } else {
                        console.log(MESSAGES.BAD_GATEWAY);
                    }
                    break;
                default:
            }
        } else {
            console.log(MESSAGES.INTERNAL_ERROR);
        }
        return xhr;
    } catch (e) {
        console.error('-- HTTP HANDLE ERROR -- ', e);
        return Promise.reject({});
    }
};
/**
 * GET Request
 *
 * @param {String} url
 * @param {Object} `HELPER_PARAMS`
 */
export const httpGet = async (
    url: any,
    { callback, headers, traceName }: any = HELPER_PARAMS
) => {
    try {
        if (!headers) ({ headers } = HELPER_PARAMS);
        if (!traceName) ({ traceName } = HELPER_PARAMS);
        headers.traceName = traceName;

        return axios
            .get(url, {
                headers: getCommonHeaders(url, headers),
                cancelToken: new CancelToken((c) => {
                    cancelHttpTokens.push(c);
                    if (callback) callback(c);
                }),
            })
            .then((res) => {
                return httpHandleResponse(res);
            })
            .catch((err) => {
                return httpHandleError(err);
            });
    } catch (e) {
        console.error('-- HTTP GET -- ', e);
        return Promise.reject({});
    }
};
/**
 * POST Request
 *
 * @param {String} url
 * @param {Object} params
 * @param {Object} `HELPER_PARAMS`
 */
export const httpPost = (
    url: any,
    params: any,
    { callback, headers, traceName }: any = HELPER_PARAMS
) => {
    try {
        if (!headers) ({ headers } = HELPER_PARAMS);
        if (!traceName) ({ traceName } = HELPER_PARAMS);
        headers.traceName = traceName;
        return axios
            .post(url, params, {
                headers: getCommonHeaders(url, headers),
                cancelToken: new CancelToken((c) => {
                    cancelHttpTokens.push(c);
                    if (callback) callback(c);
                }),
            })
            .then((res) => {
                return httpHandleResponse(res);
            })
            .catch((err) => {
                return httpHandleError(err);
            });
    } catch (e) {
        console.error('-- HTTP POST -- ', e);
        return Promise.reject({});
    }
};
/**
 * PUT Request
 *
 * @param {String} url
 * @param {Object} params
 * @param {Object} `HELPER_PARAMS`
 */
export const httpPut = (
    url: any,
    params: any,
    { callback, headers, traceName }: any = HELPER_PARAMS
) => {
    try {
        if (!headers) ({ headers } = HELPER_PARAMS);
        if (!traceName) ({ traceName } = HELPER_PARAMS);
        headers.traceName = traceName;
        return axios
            .put(url, params, {
                headers: getCommonHeaders(url, headers),
                cancelToken: new CancelToken((c) => {
                    cancelHttpTokens.push(c);
                    if (callback) callback(c);
                }),
            })
            .then((res) => {
                return httpHandleResponse(res);
            })
            .catch((err) => {
                return httpHandleError(err);
            });
    } catch (e) {
        console.error('-- HTTP PUT -- ', e);
        return Promise.reject({});
    }
};
/**
 * DELETE Request
 *
 * @param {String} url
 * @param {Object} `HELPER_PARAMS`
 */
export const httpDelete = (
    url: any,
    { callback, headers, traceName }: any = HELPER_PARAMS
) => {
    try {
        if (!headers) ({ headers } = HELPER_PARAMS);
        if (!traceName) ({ traceName } = HELPER_PARAMS);
        headers.traceName = traceName;
        return axios
            .delete(url, {
                headers: getCommonHeaders(url, headers),
                cancelToken: new CancelToken((c) => {
                    cancelHttpTokens.push(c);
                    if (callback) callback(c);
                }),
            })
            .then((res) => {
                return httpHandleResponse(res);
            })
            .catch((err) => {
                return httpHandleError(err);
            });
    } catch (e) {
        console.error('-- HTTP DELETE -- ', e);
        return Promise.reject({});
    }
};
