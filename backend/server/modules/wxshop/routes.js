import { Router } from 'express';
import * as ProductController from './controller';

const routes = new Router();

routes.post('/products', ProductController.createProduct);
routes.get('/products', ProductController.findAllProduct);
routes.get('/products/:productId', ProductController.findProduct);
routes.put('/products/:productId/edit', ProductController.updateProduct);
routes.delete('/products/:productId/delete', ProductController.deleteProduct);

export default routes;
