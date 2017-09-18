import { Router } from 'express';
import { checkLogin } from '../../config/check';
import * as adminController from './controller';

const routes = new Router();

routes.get('/login', adminController.getAdminLogin);

export default routes;