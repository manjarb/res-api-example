import SiteController from './controller/SiteController';
import UserController from './controller/UserController';

export const Routes = [
    {
        method: 'get',
        route: '/',
        controller: SiteController,
        action: 'index'
    }, {
        method: 'get',
        route: '/users',
        controller: UserController,
        action: 'all'
    }, {
        method: 'get',
        route: '/users/:id',
        controller: UserController,
        action: 'one'
    }, {
        method: 'post',
        route: '/users',
        controller: UserController,
        action: 'save'
    }, {
        method: 'delete',
        route: '/users/:id',
        controller: UserController,
        action: 'remove'
    }
];
