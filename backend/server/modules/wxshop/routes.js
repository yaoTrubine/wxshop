import { Router } from 'express';
import * as ProductController from './controller';

const routes = new Router();

routes.post('/products', ProductController.createProduct);
routes.get('/products',ProductController.findAllProduct);
routes.put('/products/:id/edit',ProductController.updateProduct);
routes.delete('/products/:productId/delete',ProductController.deleteProduct);

export default routes;
