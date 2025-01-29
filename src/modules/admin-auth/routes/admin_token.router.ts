import * as express from 'express';
import * as AdminTokenController from '../controllers/admin_user_token.controller';
import { AdminAuthMiddleware } from '../../../middlewares/admin_auth.middleware';

const AdminTokenRouter = express.Router();

const route_prefix = '/admin/token';

AdminTokenRouter.get(route_prefix, AdminAuthMiddleware, AdminTokenController.get_all_admin_token);

AdminTokenRouter.delete(route_prefix, AdminAuthMiddleware, AdminTokenController.remove_user_token);

AdminTokenRouter.delete(
	`${route_prefix}/all`,
	AdminAuthMiddleware,
	AdminTokenController.terminate_all_tokens
);

export default AdminTokenRouter;
