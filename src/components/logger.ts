import { hostname } from 'os';
import { ErrorLevel } from './enum';
class Logger {

    private readonly _hostname = hostname();

    info(msg: string, params: object = {}) {
        this.log(msg, params, ErrorLevel.INFO);
    }

    warning(msg: string, params: object = {}) {
        this.log(msg, params, ErrorLevel.WARNING);
    }

    error(msg: string, params: object = {}) {
        this.log(msg, params, ErrorLevel.ERROR);
    }

    private log(msg: string, params: object = {}, level: ErrorLevel) {
        params['host'] = this._hostname;
        params['msg'] = msg;
        params['level'] = level;
        console.log(JSON.stringify(params));
    }
}

export const logger = new Logger();
