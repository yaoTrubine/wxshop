import { Router } from 'express';
import * as ProductController from './controller';

const routes = new Router();

routes.post('/products', ProductController.createProduct);

export default routes;
