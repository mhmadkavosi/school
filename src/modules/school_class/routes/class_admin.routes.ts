import { AdminAuthMiddleware } from '../../../middlewares/admin_auth.middleware';
import * as StudentController from '../../student/controllers/student.controller';
import * as SchoolController from '../../school/controllers/school.controller';
import * as ClassController from '../controllers/class.controller';
import * as ClassAdminController from '../controllers/class_admin.controller';

import { Router } from 'express';

const AdminClassRouter: Router = Router();

const route_prefix = '/admin/class';

AdminClassRouter.get(
	`${route_prefix}/teacher`,
	AdminAuthMiddleware,
	ClassAdminController.get_all_class_of_teacher
);

AdminClassRouter.get(
	`${route_prefix}/student`,
	AdminAuthMiddleware,
	ClassAdminController.get_all_student_by_class_id
);
AdminClassRouter.put(`${route_prefix}`, AdminAuthMiddleware, ClassAdminController.update_class);

AdminClassRouter.post(`${route_prefix}/student`, AdminAuthMiddleware, StudentController.create);
AdminClassRouter.delete(`${route_prefix}/student`, AdminAuthMiddleware, StudentController.delete_student);
AdminClassRouter.put(`${route_prefix}/student`, AdminAuthMiddleware, StudentController.update);

AdminClassRouter.delete(`${route_prefix}`, AdminAuthMiddleware, ClassAdminController.destroy_class);
AdminClassRouter.post(`${route_prefix}`, AdminAuthMiddleware, ClassAdminController.create_class);
AdminClassRouter.put(`${route_prefix}/school`, AdminAuthMiddleware, SchoolController.update_school);
AdminClassRouter.get(
	`${route_prefix}/school/:school_id/info`,
	AdminAuthMiddleware,
	ClassController.get_all_by_school_id
);

export default AdminClassRouter;
