import { AdminAuthMiddleware } from '../../../middlewares/admin_auth.middleware';
import * as AdminLogsController from '../controller/admin_logs.controller';
import { Router } from 'express';

const AdminLogsRouter: Router = Router();

const route_prefix = '/admin/logs';

AdminLogsRouter.get(`${route_prefix}`, AdminAuthMiddleware, AdminLogsController.get_all);
AdminLogsRouter.get(`${route_prefix}/users`, AdminAuthMiddleware, AdminLogsController.get_all_for_users);

export default AdminLogsRouter;
