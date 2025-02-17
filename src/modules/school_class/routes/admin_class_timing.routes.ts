import { AdminAuthMiddleware } from '../../../middlewares/admin_auth.middleware';
import * as ClassTimingController from '../controllers/class_timing.controller';
import * as AdminClassTimingController from '../controllers/class_timing_admin.controller';
import { Router } from 'express';

const AdminClassTimingRouter: Router = Router();

const route_prefix = '/admin/class-timing';

AdminClassTimingRouter.get(
	`${route_prefix}/:class_id/all`,
	AdminAuthMiddleware,
	ClassTimingController.get_all
);
AdminClassTimingRouter.get(
	`${route_prefix}/class/time`,
	AdminAuthMiddleware,
	AdminClassTimingController.get_class_time
);
AdminClassTimingRouter.post(route_prefix, AdminAuthMiddleware, ClassTimingController.create);
AdminClassTimingRouter.get(
	`${route_prefix}/:class_timing_id/info`,
	AdminAuthMiddleware,
	ClassTimingController.get_info
);
AdminClassTimingRouter.put(`${route_prefix}`, AdminAuthMiddleware, ClassTimingController.update);
AdminClassTimingRouter.delete(`${route_prefix}`, AdminAuthMiddleware, ClassTimingController.destroy);

export default AdminClassTimingRouter;
