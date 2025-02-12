import { TeacherAuthMiddleware } from '../../../middlewares/teacher_auth.middleware';
import * as NotificationController from '../controllers/notification.controller';
import { Router } from 'express';

const NotificationRouter: Router = Router();

const route_prefix = '/notification';

NotificationRouter.get(
	`${route_prefix}/class/:class_id/info`,
	TeacherAuthMiddleware,
	NotificationController.notification_get_by_class
);

NotificationRouter.get(
	`${route_prefix}/teacher/info`,
	TeacherAuthMiddleware,
	NotificationController.notification_get_by_teacher
);

NotificationRouter.get(
	`${route_prefix}/student/:student_id/info`,
	TeacherAuthMiddleware,
	NotificationController.notification_get_by_student
);

export default NotificationRouter;
