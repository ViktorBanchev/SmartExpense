import { Router } from 'express';
import userController from './controllers/userController';
import transactionController from './controllers/transactionController';

const routes = Router();

routes.use('/users', userController);
routes.use('/transactions', transactionController);

export default routes;