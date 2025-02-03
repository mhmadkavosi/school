import * as AdminTeacherController from '../controllers/admin_teacher.controller';
import { Router } from 'express';
import { AdminAuthMiddleware } from '../../../middlewares/admin_auth.middleware';

const AdminTeacherRouter: Router = Router();

const route_prefix = '/admin/teacher';

AdminTeacherRouter.get(
	`${route_prefix}/total`,
	AdminAuthMiddleware,
	AdminTeacherController.get_total_teacher
);

AdminTeacherRouter.get(`${route_prefix}/list`, AdminAuthMiddleware, AdminTeacherController.get_all_teacher);

AdminTeacherRouter.get(
	`${route_prefix}/section`,
	AdminAuthMiddleware,
	AdminTeacherController.get_total_teacher_section
);

export default AdminTeacherRouter;
