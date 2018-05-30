import { Request, Response, NextFunction } from 'express';
import { appName } from '../components/constants';

export default class SiteController {

    /*
    * @api [get] /
    * description: Retuns the name of the service
    * responses:
    *  200:
    *      description: Success.
    *      schema:
    *           $ref: '#/definitions/ServiceName'
    *  500:
    *       description: Internal server error.
    *       schema:
    *           $ref: '#/definitions/Error'
    */

    async index(req: Request, res: Response, next: NextFunction) {
        res.json({ service_name: appName });
    }
}
