import { TeacherAuthMiddleware } from '../../../middlewares/teacher_auth.middleware';
import * as ClassController from '../controllers/class.controller';
import { Router } from 'express';

const ClassRouter: Router = Router();

const route_prefix = '/class';

ClassRouter.get(`${route_prefix}/teacher`, TeacherAuthMiddleware, ClassController.get_all_class_of_teacher);
ClassRouter.get(`${route_prefix}/link/:link/info`, ClassController.get_by_link);
ClassRouter.get(`${route_prefix}/:class_id/info`, TeacherAuthMiddleware, ClassController.get_by_id);
ClassRouter.get(
	`${route_prefix}/school/:school_id/info`,
	TeacherAuthMiddleware,
	ClassController.get_all_by_school_id
);
ClassRouter.get(
	`${route_prefix}/student/:school_id/all`,
	TeacherAuthMiddleware,
	ClassController.get_all_student_by_school_id
);

ClassRouter.get(
	`${route_prefix}/student/export`,
	TeacherAuthMiddleware,
	ClassController.get_students_for_exports
);

ClassRouter.delete(`${route_prefix}`, TeacherAuthMiddleware, ClassController.destroy_class);
ClassRouter.put(`${route_prefix}`, TeacherAuthMiddleware, ClassController.update_class);
ClassRouter.post(`${route_prefix}`, TeacherAuthMiddleware, ClassController.create_class);

export default ClassRouter;
