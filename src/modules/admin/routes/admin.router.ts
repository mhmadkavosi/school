import * as express from 'express';
import * as AdminController from '../../admin/controllers/admin_user.controller';
import { AdminAuthMiddleware } from '../../../middlewares/admin_auth.middleware';

const AdminRouter = express.Router();

const route_prefix = '/admin';

AdminRouter.post(route_prefix, AdminController.create_admin);

AdminRouter.get(`${route_prefix}/all`, AdminAuthMiddleware, AdminController.get_all_admin);

AdminRouter.get(`${route_prefix}/info`, AdminAuthMiddleware, AdminController.get_admin_info_by_admin_id);

AdminRouter.put(`${route_prefix}/is-active`, AdminAuthMiddleware, AdminController.update_is_active);

AdminRouter.put(`${route_prefix}`, AdminAuthMiddleware, AdminController.update_info);

AdminRouter.put(
	`${route_prefix}/profile-picture`,
	AdminAuthMiddleware,
	AdminController.update_profile_picture
);
AdminRouter.delete(
	`${route_prefix}/profile-picture`,
	AdminAuthMiddleware,
	AdminController.delete_profile_picture
);

export default AdminRouter;
