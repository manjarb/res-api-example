const environment = process.env;

export const appName = 'rest-api-example';
export const env = environment.NODE_ENV;
export const port = environment.PORT;
export const configFile = environment.CONFIG_FILE;

export const statusCode = {
    OK: 200,
    CREATED: 201, // post or put
    ACCEPTED: 202,
    NO_CONTENT: 204,
    FOUND: 302,
    NOT_MODIFIFED: 304,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    NOT_ACCEPTABLE: 406,
    GONE: 410,
    UNSUPPORTED_MEDIA_TYPE: 415,
    UNPROCESSABLE_ENTITY: 422,
    TOO_MANY_REQUESTS: 429,
    INTERNAL_SERVER_ERROR: 500,
    NOT_IMPLEMENTED: 501,
    BAD_GATEWAY: 502,
    SERVICE_UNAVAILABLE: 503,
    GATEWAY_TIMEOUT: 504
};
