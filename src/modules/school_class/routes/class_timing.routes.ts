import { TeacherAuthMiddleware } from '../../../middlewares/teacher_auth.middleware';
import * as ClassTimingController from '../controllers/class_timing.controller';
import { Router } from 'express';

const ClassTimingRouter: Router = Router();

const route_prefix = '/class-timing';

ClassTimingRouter.get(`${route_prefix}/:class_id/all`, TeacherAuthMiddleware, ClassTimingController.get_all);
ClassTimingRouter.get(
	`${route_prefix}/class/time`,
	TeacherAuthMiddleware,
	ClassTimingController.get_class_time
);
ClassTimingRouter.post(route_prefix, TeacherAuthMiddleware, ClassTimingController.create);
ClassTimingRouter.get(
	`${route_prefix}/:class_timing_id/info`,
	TeacherAuthMiddleware,
	ClassTimingController.get_info
);
ClassTimingRouter.put(`${route_prefix}`, TeacherAuthMiddleware, ClassTimingController.update);
ClassTimingRouter.delete(`${route_prefix}`, TeacherAuthMiddleware, ClassTimingController.destroy);

ClassTimingRouter.get(
	`${route_prefix}/student/time`,
	TeacherAuthMiddleware,
	ClassTimingController.get_student_class_timing
);

export default ClassTimingRouter;
