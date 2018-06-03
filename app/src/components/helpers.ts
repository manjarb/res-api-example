import { ErrorCode } from './enum';
import { ErrorResponse } from './interface';

export function getErrorMessage(error: any) {
    return error.message ? error.message : error;
}

export function errorMsg(code: ErrorCode, message: string): ErrorResponse {
    return { errorCode: code, errorMessage: message };
}
