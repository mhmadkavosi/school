import { StudentAuthMiddleware } from '../../../middlewares/student_auth.middleware';
import * as StudentController from '../controllers/student.controller';
import { Router } from 'express';

const StudentRouter: Router = Router();

const route_prefix = '/student';

StudentRouter.put(route_prefix, StudentAuthMiddleware, StudentController.update);

StudentRouter.put(
	`${route_prefix}/profile-picture`,
	StudentAuthMiddleware,
	StudentController.update_profile_picture
);
StudentRouter.delete(
	`${route_prefix}/profile-picture`,
	StudentAuthMiddleware,
	StudentController.delete_profile_picture
);

StudentRouter.get(`${route_prefix}/me`, StudentAuthMiddleware, StudentController.get_info);

StudentRouter.get(`${route_prefix}/class`, StudentAuthMiddleware, StudentController.get_class_of_student);

export default StudentRouter;
