import { AdminAuthMiddleware } from '../../../middlewares/admin_auth.middleware';
import * as AdminLogsController from '../controller/admin_logs.controller';
import { Router } from 'express';

const AdminLogsRouter: Router = Router();

const route_prefix = '/admin/logs';

AdminLogsRouter.get(`${route_prefix}`, AdminAuthMiddleware, AdminLogsController.get_all);
export default AdminLogsRouter;
