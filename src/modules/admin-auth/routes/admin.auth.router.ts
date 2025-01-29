import * as express from 'express';
import * as AdminAuthController from '../controllers/admin_auth.controller';
import { AdminAuthMiddleware } from '../../../middlewares/admin_auth.middleware';

const AdminAuthRouter = express.Router();

const route_prefix = '/admin/auth';

AdminAuthRouter.post(`${route_prefix}/login`, AdminAuthController.login);
AdminAuthRouter.post(`${route_prefix}/logout`, AdminAuthMiddleware, AdminAuthController.logout);

export default AdminAuthRouter;
