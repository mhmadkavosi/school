import { TeacherAuthMiddleware } from '../../../middlewares/teacher_auth.middleware';
import * as StudentController from '../controllers/student.controller';
import { Router } from 'express';

const StudentRouter: Router = Router();

const route_prefix = '/student';

StudentRouter.post(route_prefix, TeacherAuthMiddleware, StudentController.create);
StudentRouter.delete(route_prefix, TeacherAuthMiddleware, StudentController.delete_student);
StudentRouter.put(route_prefix, TeacherAuthMiddleware, StudentController.update);

StudentRouter.put(
	`${route_prefix}/profile-picture`,
	TeacherAuthMiddleware,
	StudentController.update_profile_picture
);
StudentRouter.delete(
	`${route_prefix}/profile-picture`,
	TeacherAuthMiddleware,
	StudentController.delete_profile_picture
);

StudentRouter.get(
	`${route_prefix}/class/all`,
	TeacherAuthMiddleware,
	StudentController.get_all_student_of_class
);
StudentRouter.get(
	`${route_prefix}/class/search`,
	TeacherAuthMiddleware,
	StudentController.get_all_student_of_class_with_search
);

StudentRouter.get(`${route_prefix}/:student_id/info`, TeacherAuthMiddleware, StudentController.get_info);

export default StudentRouter;
