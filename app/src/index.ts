import 'reflect-metadata';
import * as express from 'express';
import * as http from 'http';
import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as expressValidator from 'express-validator';
import { createConnection, ConnectionOptions } from 'typeorm';
import { Routes } from './routes';
import { ErrorCode } from './components/enum';
import { errorMsg, getErrorMessage } from './components/helpers';
import { appName, env, port, statusCode } from './components/constants';
import { config } from './components/config';
import { logger } from './components/logger';

const options = {
    'extra': {
        'application_name': appName
    },
    'synchronize': false,
    'logging': (env === 'prod') ? false : true,
    'entities': [
        'dist/entity/*.js'
    ],
    'migrations': [
        'dist/migration/**/*.js'
    ],
    'subscribers': [
        'dist/subscriber/**/*.js'
    ],
    'cli': {
        'entitiesDir': 'dist/entity',
        'migrationsDir': 'dist/migration',
        'subscribersDir': 'dist/subscriber'
    }
};

const db: ConnectionOptions = {
    'type': 'postgres',
    'host': config.host,
    'port': config.port,
    'username': config.user,
    'password': config.password,
    'database': config.database
};

Object.assign(db, options);

createConnection(db).then(async connection => {

    // create express app
    const app = express();
    app.use(compression());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(expressValidator());

    // response header middleware
    app.use(function (req: express.Request, res: express.Response, next: express.NextFunction) {
        res.header('Access-Control-Allow-Headers', 'Origin, Accept, Content-Type, Access-Control-Allow-Headers,X-Requested-With');
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        if (!req.accepts('json')) {
            res.status(statusCode.UNSUPPORTED_MEDIA_TYPE);
            return res.json(errorMsg(ErrorCode.UnsupportedMediaType, 'Unsupported media type'));
        }
        if (req.method === 'OPTIONS') {
            return res.sendStatus(statusCode.OK);
        } else {
            next();
        }
    });

    // register express routes from defined application routes
    Routes.forEach(route => {
        (app as any)[route.method](route.route, (req: express.Request, res: express.Response, next: express.NextFunction) => {
            const result = (new (route.controller as any))[route.action](req, res, next);
            if (result instanceof Promise) {
                result.then(result => result !== null && result !== undefined ? res.send(result) : undefined);

            } else if (result !== null && result !== undefined) {
                res.json(result);
            }
        });
    });

    // catch 404 and forward to error handler
    app.use(function (req: express.Request, res: express.Response, next: express.NextFunction) {
        next(new Error('Not Found'));
    });

    app.use(function (err: Error, req: express.Request, res: express.Response, next: express.NextFunction) {
        res.status(statusCode.NOT_FOUND);
        res.json(errorMsg(ErrorCode.NotFound, err.message));
    });

    // start express server
    http.createServer(app).listen(port);
    logger.info(`App running on http://localhost:${port}`);

}).catch(err => {
    logger.error(getErrorMessage(err));
});
