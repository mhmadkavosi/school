import { StudentAuthMiddleware } from '../../../middlewares/student_auth.middleware';
import { TeacherAuthMiddleware } from '../../../middlewares/teacher_auth.middleware';
import * as StudentHomeWorkController from '../controllers/student_home_work.controller';
import * as HomeWorkFileController from '../controllers/home_work_files.controller';

import { Router } from 'express';

const StudentHomeWorkRouter: Router = Router();

const route_prefix = '/student-home-work';

StudentHomeWorkRouter.put(
	`${route_prefix}/desc`,
	TeacherAuthMiddleware,
	StudentHomeWorkController.update_desc
);
StudentHomeWorkRouter.put(
	`${route_prefix}/score`,
	TeacherAuthMiddleware,
	StudentHomeWorkController.update_score
);
StudentHomeWorkRouter.put(
	`${route_prefix}/status`,
	TeacherAuthMiddleware,
	StudentHomeWorkController.update_status
);

StudentHomeWorkRouter.get(
	`${route_prefix}/`,
	StudentAuthMiddleware,
	StudentHomeWorkController.get_student_home_work
);

StudentHomeWorkRouter.get(
	`${route_prefix}/:home_work_id/info`,
	StudentAuthMiddleware,
	StudentHomeWorkController.get_student_home_work_details
);

StudentHomeWorkRouter.get(
	`${route_prefix}/count`,
	StudentAuthMiddleware,
	StudentHomeWorkController.get_count_home_work
);

StudentHomeWorkRouter.put(
	`${route_prefix}/status/done`,
	StudentAuthMiddleware,
	StudentHomeWorkController.status_done_student
);

StudentHomeWorkRouter.put(`${route_prefix}/file`, StudentAuthMiddleware, HomeWorkFileController.update_file);

StudentHomeWorkRouter.delete(
	`${route_prefix}/file`,
	StudentAuthMiddleware,
	HomeWorkFileController.delete_file
);

StudentHomeWorkRouter.get(
	`${route_prefix}/activity`,
	StudentAuthMiddleware,
	StudentHomeWorkController.get_all_student_of_home_work
);

export default StudentHomeWorkRouter;
