import { TeacherAuthMiddleware } from './../../../middlewares/teacher_auth.middleware';
import * as TeacherController from '../controllers/teacher.controller';
import { Router } from 'express';

const TeacherRouter: Router = Router();

const route_prefix = '/teacher';

TeacherRouter.get(`${route_prefix}/me`, TeacherAuthMiddleware, TeacherController.get_by_id);
TeacherRouter.get(`${route_prefix}/school/:school_id/all`, TeacherController.get_all_by_school_id);

TeacherRouter.post(
	`${route_prefix}/request/phone-number`,
	TeacherAuthMiddleware,
	TeacherController.request_update_phone_number
);
TeacherRouter.put(
	`${route_prefix}/confirm/phone-number`,
	TeacherAuthMiddleware,
	TeacherController.phone_number_confirm
);
TeacherRouter.post(
	`${route_prefix}/request/forgot-password`,

	TeacherController.request_forgot_password
);

TeacherRouter.post(
	`${route_prefix}/confirm/forgot-password`,

	TeacherController.forgot_password_confirm
);

TeacherRouter.put(
	`${route_prefix}/set-password`,

	TeacherController.forgot_password_set_password
);

TeacherRouter.post(
	`${route_prefix}/request/email`,
	TeacherAuthMiddleware,
	TeacherController.request_update_email
);
TeacherRouter.put(`${route_prefix}/confirm/email`, TeacherAuthMiddleware, TeacherController.email_confirm);
TeacherRouter.put(
	`${route_prefix}/profile-picture`,
	TeacherAuthMiddleware,
	TeacherController.update_profile_picture
);
TeacherRouter.delete(
	`${route_prefix}/profile-picture`,
	TeacherAuthMiddleware,
	TeacherController.delete_profile_picture
);
TeacherRouter.put(`${route_prefix}/details`, TeacherAuthMiddleware, TeacherController.update_details);
TeacherRouter.put(`${route_prefix}/password`, TeacherAuthMiddleware, TeacherController.update_password);

export default TeacherRouter;
