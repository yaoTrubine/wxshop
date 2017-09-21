import { Router } from 'express';
import * as UserController from './controller';

const routes = new Router;

routes.post('/wx/login', UserController.saveUsers);
routes.get('/wx/users',UserController.getUsers);

export default routes;