import { Router } from 'express';
import { checkLogin } from '../../config/check';
import * as ProductController from './controller';

const routes = new Router();

routes.post('/products', checkLogin, ProductController.createProduct);
routes.get('/products', ProductController.findAllProduct);
routes.put('/products/:id/edit',checkLogin, ProductController.updateProduct);
routes.delete('/products/:productId/delete', checkLogin, ProductController.deleteProduct);

export default routes;
