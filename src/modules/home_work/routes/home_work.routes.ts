import { TeacherAuthMiddleware } from '../../../middlewares/teacher_auth.middleware';
import * as HomeWorkController from '../controllers/home_work.controller';
import * as HomeWorkFileController from '../controllers/home_work_files.controller';

import { Router } from 'express';

const HomeWorkRouter: Router = Router();

const route_prefix = '/home-work';

HomeWorkRouter.post(`${route_prefix}`, TeacherAuthMiddleware, HomeWorkController.create);

HomeWorkRouter.get(
	`${route_prefix}/class/:class_id/count`,
	TeacherAuthMiddleware,
	HomeWorkController.get_count_of_home_work_class
);

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

HomeWorkRouter.get(`${route_prefix}/count`, TeacherAuthMiddleware, HomeWorkController.get_count_of_home_work);

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

HomeWorkRouter.get(
	`${route_prefix}/student/:student_id/all`,
	TeacherAuthMiddleware,
	HomeWorkController.get_all_by_student_id
);

HomeWorkRouter.put(`${route_prefix}/file`, TeacherAuthMiddleware, HomeWorkFileController.update_file);

HomeWorkRouter.delete(`${route_prefix}/file`, TeacherAuthMiddleware, HomeWorkFileController.delete_file);

HomeWorkRouter.put(`${route_prefix}`, TeacherAuthMiddleware, HomeWorkController.update);
HomeWorkRouter.delete(`${route_prefix}`, TeacherAuthMiddleware, HomeWorkController.delete_home_work);
HomeWorkRouter.delete(
	`${route_prefix}/class`,
	TeacherAuthMiddleware,
	HomeWorkController.delete_class_from_home_work
);
HomeWorkRouter.delete(
	`${route_prefix}/student`,
	TeacherAuthMiddleware,
	HomeWorkController.delete_student_from_home_work
);

export default HomeWorkRouter;
