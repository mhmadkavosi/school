import { AdminAuthMiddleware } from '../../../middlewares/admin_auth.middleware';

import * as AdminSchoolController from '../controllers/school_admin.controller';
import * as SchoolController from '../controllers/school.controller';

import { Router } from 'express';

const AdminSchoolRouter: Router = Router();

const route_prefix = '/admin/school';

AdminSchoolRouter.get(`${route_prefix}/total`, AdminAuthMiddleware, AdminSchoolController.get_total);
AdminSchoolRouter.get(`${route_prefix}/all`, AdminAuthMiddleware, AdminSchoolController.get_all_school);
AdminSchoolRouter.get(
	`${route_prefix}/total/category`,
	AdminAuthMiddleware,
	AdminSchoolController.get_total_school_by_category
);

AdminSchoolRouter.post(route_prefix, AdminAuthMiddleware, SchoolController.create_school);
AdminSchoolRouter.get(
	`${route_prefix}/:school_id/info`,
	AdminAuthMiddleware,
	SchoolController.get_info_by_id
);

export default AdminSchoolRouter;
