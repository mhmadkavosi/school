import * as AdminTeacherController from '../controllers/admin_teacher.controller';
import { Router } from 'express';
import { AdminAuthMiddleware } from '../../../middlewares/admin_auth.middleware';
import AdminRouter from '../../admin/routes/admin.router';

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

AdminTeacherRouter.get(
	`${route_prefix}/:teacher_id/info`,
	AdminAuthMiddleware,
	AdminTeacherController.get_by_id
);

AdminRouter.put(
	`${route_prefix}/phone-number`,
	AdminAuthMiddleware,
	AdminTeacherController.phone_number_update
);

AdminRouter.post(`${route_prefix}/email`, AdminAuthMiddleware, AdminTeacherController.email_update);

AdminRouter.put(
	`${route_prefix}/profile-picture`,
	AdminAuthMiddleware,
	AdminTeacherController.update_profile_picture
);
AdminRouter.delete(
	`${route_prefix}/profile-picture`,
	AdminAuthMiddleware,
	AdminTeacherController.delete_profile_picture
);
AdminRouter.put(`${route_prefix}/details`, AdminAuthMiddleware, AdminTeacherController.update_details);
AdminRouter.put(`${route_prefix}/password`, AdminAuthMiddleware, AdminTeacherController.update_password);

export default AdminTeacherRouter;
