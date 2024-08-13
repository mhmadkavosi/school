import { TeacherAuthMiddleware } from '../../../middlewares/teacher_auth.middleware';
import * as HomeWorkController from '../controllers/home_work.controller';
import { Router } from 'express';

const HomeWorkRouter: Router = Router();

const route_prefix = '/home-work';

HomeWorkRouter.post(`${route_prefix}`, TeacherAuthMiddleware, HomeWorkController.create);
HomeWorkRouter.post(
	`${route_prefix}/class`,
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

HomeWorkRouter.put(`${route_prefix}`, TeacherAuthMiddleware, HomeWorkController.update);

export default HomeWorkRouter;