import { TeacherAuthMiddleware } from '../../../middlewares/teacher_auth.middleware';
import * as StudentHomeWorkController from '../controllers/student_home_work.controller';
import { Router } from 'express';

const StudentHomeWorkRouter: Router = Router();

const route_prefix = '/student-home-work';

StudentHomeWorkRouter.post(
	route_prefix,
	TeacherAuthMiddleware,
	StudentHomeWorkController.add_students_home_work
);
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

export default StudentHomeWorkRouter;
