import { TeacherAuthMiddleware } from '../../../middlewares/teacher_auth.middleware';
import * as StudentController from '../controllers/student_teacehr.controller';
import { Router } from 'express';

const StudentTeacherRouter: Router = Router();

const route_prefix = '/teacher/student';

StudentTeacherRouter.post(route_prefix, TeacherAuthMiddleware, StudentController.create);
StudentTeacherRouter.delete(route_prefix, TeacherAuthMiddleware, StudentController.delete_student);
StudentTeacherRouter.put(route_prefix, TeacherAuthMiddleware, StudentController.update_teacher);

StudentTeacherRouter.put(
	`${route_prefix}/profile-picture`,
	TeacherAuthMiddleware,
	StudentController.update_profile_picture
);
StudentTeacherRouter.delete(
	`${route_prefix}/profile-picture`,
	TeacherAuthMiddleware,
	StudentController.delete_profile_picture
);

StudentTeacherRouter.get(
	`${route_prefix}/class/all`,
	TeacherAuthMiddleware,
	StudentController.get_all_student_of_class
);

StudentTeacherRouter.get(
	`${route_prefix}/school/all`,
	TeacherAuthMiddleware,
	StudentController.get_all_student_of_school
);

StudentTeacherRouter.get(
	`${route_prefix}/class/search`,
	TeacherAuthMiddleware,
	StudentController.get_all_student_of_class_with_search
);

StudentTeacherRouter.get(
	`${route_prefix}/:student_id/info`,
	TeacherAuthMiddleware,
	StudentController.get_info
);

export default StudentTeacherRouter;
