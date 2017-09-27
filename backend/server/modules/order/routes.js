import { Router } from 'express';
import * as OrderRouter from './controller';
const routes = new Router;

routes.post('/order/new', OrderRouter.createOrder);
routes.get('/order/all', OrderRouter.findAllOrder);
routes.get('/order/:openId', OrderRouter.findOrder);
routes.delete('/order/:orderId/delete',OrderRouter.deleteOrder);


export default routes;