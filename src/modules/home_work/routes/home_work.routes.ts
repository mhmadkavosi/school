import { TeacherAuthMiddleware } from '../../../middlewares/teacher_auth.middleware';
import * as HomeWorkController from '../controllers/home_work.controller';
import { Router } from 'express';

const HomeWorkRouter: Router = Router();

const route_prefix = '/home-work';

HomeWorkRouter.post(`${route_prefix}`, TeacherAuthMiddleware, HomeWorkController.create);
HomeWorkRouter.post(
	`${route_prefix}/update`,
	TeacherAuthMiddleware,
	HomeWorkController.add_home_work_for_classes
);
HomeWorkRouter.get(
	`${route_prefix}/teacher`,
	TeacherAuthMiddleware,
	HomeWorkController.get_all_home_work_of_teacher
);

HomeWorkRouter.get(
	`${route_prefix}/:home_work_id/count`,
	TeacherAuthMiddleware,
	HomeWorkController.get_count_of_home_work
);

HomeWorkRouter.get(
	`${route_prefix}/:home_work_id/info`,
	TeacherAuthMiddleware,
	HomeWorkController.get_home_work_info
);

HomeWorkRouter.get(
	`${route_prefix}/student/all`,
	TeacherAuthMiddleware,
	HomeWorkController.get_all_student_of_home_work
);

HomeWorkRouter.put(`${route_prefix}`, TeacherAuthMiddleware, HomeWorkController.update);
HomeWorkRouter.delete(`${route_prefix}`, TeacherAuthMiddleware, HomeWorkController.delete_home_work);

export default HomeWorkRouter;
