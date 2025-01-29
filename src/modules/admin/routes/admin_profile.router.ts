import * as express from 'express';
import * as AdminController from '../../admin/controllers/admin_user.controller';
import { AdminAuthMiddleware } from '../../../middlewares/admin_auth.middleware';

const AdminProfileRouter = express.Router();

const route_prefix = '/admin/profile';

AdminProfileRouter.get(`${route_prefix}/me`, AdminAuthMiddleware, AdminController.get_admin_info);

AdminProfileRouter.put(`${route_prefix}/password`, AdminAuthMiddleware, AdminController.update_password);

export default AdminProfileRouter;
