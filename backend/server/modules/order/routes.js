import { Router } from 'express';
import * as OrderRouter from './controller';
const routes = new Router;

routes.post('/order/new', OrderRouter.createOrder);


export default routes;