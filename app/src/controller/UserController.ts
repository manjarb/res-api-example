import { getRepository } from 'typeorm';
import { Request, Response, NextFunction } from 'express';
import { User } from '../entity/User';
import { UserModel } from '../controller/components/model';
import { errorMsg, getErrorMessage } from '../components/helpers';
import { ErrorCode } from '../components/enum';
import { statusCode } from '../components/constants';
import { logger } from '../components/logger';

export default class UserController {

    private userRepository = getRepository(User);

    async all(req: Request, res: Response, next: NextFunction) {
        try {
            const users: User[] = await this.userRepository.find();
            if (users.length) {
                res.json(<UserModel[]>users);
            } else {
                res.status(statusCode.NOT_FOUND);
                res.json(errorMsg(ErrorCode.NotFound, `Users doesn't exist`));
            }
        } catch (err) {
            const msg = getErrorMessage(err);
            logger.error(msg);
            if (!err.statusCode) {
                res.status(statusCode.INTERNAL_SERVER_ERROR);
                res.json(errorMsg(ErrorCode.InternalServerError, msg));
            } else if (err.statusCode === statusCode.BAD_REQUEST) {
                res.status(statusCode.BAD_REQUEST);
                res.json(errorMsg(ErrorCode.BadRequest, msg));
            } else {
                res.status(err.statusCode);
                res.end();
            }
        }
    }

    async one(req: Request, res: Response, next: NextFunction) {
        try {
            const user: User = await this.userRepository.findOne(req.params.id);
            if (user) {
                res.json(<UserModel>user);
            } else {
                res.status(statusCode.NOT_FOUND);
                res.json(errorMsg(ErrorCode.NotFound, `User doesn't exist`));
            }
        } catch (err) {
            const msg = getErrorMessage(err);
            logger.error(msg);
            if (!err.statusCode) {
                res.status(statusCode.INTERNAL_SERVER_ERROR);
                res.json(errorMsg(ErrorCode.InternalServerError, msg));
            } else if (err.statusCode === statusCode.BAD_REQUEST) {
                res.status(statusCode.BAD_REQUEST);
                res.json(errorMsg(ErrorCode.BadRequest, msg));
            } else {
                res.status(err.statusCode);
                res.end();
            }
        }
    }

    async save(req: Request, res: Response, next: NextFunction) {
        try {
            req.checkBody('firstName').notEmpty().withMessage('firstName cannot be empty').isAlphanumeric().withMessage('firstName is not valid');
            req.checkBody('lastName').notEmpty().withMessage('lastName cannot be empty').isAlphanumeric().withMessage('lastName is not valid');
            if (req.body.age) {
                req.checkBody('age').isNumeric().withMessage('age is not valid');
            }
            const errors = req.validationErrors();
            if (errors) {
                logger.error(JSON.stringify(errors));
                res.status(statusCode.BAD_REQUEST);
                res.json(errorMsg(ErrorCode.BadRequest, JSON.stringify(errors)));
            } else {
                const user: User = await this.userRepository.save(req.body);
                res.json(<UserModel>user);
            }
        } catch (err) {
            const msg = getErrorMessage(err);
            logger.error(msg);
            if (!err.statusCode) {
                res.status(statusCode.INTERNAL_SERVER_ERROR);
                res.json(errorMsg(ErrorCode.InternalServerError, msg));
            } else if (err.statusCode === statusCode.BAD_REQUEST) {
                res.status(statusCode.BAD_REQUEST);
                res.json(errorMsg(ErrorCode.BadRequest, msg));
            } else {
                res.status(err.statusCode);
                res.end();
            }
        }
    }

    async remove(req: Request, res: Response, next: NextFunction) {
        try {
            await this.userRepository.delete(req.params.id);
            res.status(statusCode.OK);
            res.end();
        } catch (err) {
            const msg = getErrorMessage(err);
            logger.error(msg);
            if (!err.statusCode) {
                res.status(statusCode.INTERNAL_SERVER_ERROR);
                res.json(errorMsg(ErrorCode.InternalServerError, msg));
            } else if (err.statusCode === statusCode.BAD_REQUEST) {
                res.status(statusCode.BAD_REQUEST);
                res.json(errorMsg(ErrorCode.BadRequest, msg));
            } else {
                res.status(err.statusCode);
                res.end();
            }
        }
    }
}
