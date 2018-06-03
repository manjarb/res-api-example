export enum ErrorCode {
    Created = 'Created',
    Unauthorized = 'Unauthorized',
    NotFound = 'NotFound',
    BadRequest = 'BadRequest',
    InternalServerError = 'InternalServerError',
    ExternalServerError = 'ExternalServerError',
    UnsupportedMediaType = 'UnsupportedMediaType',
    Forbidden = 'Forbidden',
    TooManyRequests = 'TooManyRequests',
    NotProcessed = 'NotProcessed'
}

export enum ErrorLevel {
    ERROR = 'ERROR',
    INFO = 'INFO',
    WARNING = 'WARNING',
    CRITICAL = 'CRITICAL'
}
