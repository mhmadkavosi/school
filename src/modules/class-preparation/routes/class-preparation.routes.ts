import { StudentAuthMiddleware } from '../../../middlewares/student_auth.middleware';
import { TeacherAuthMiddleware } from '../../../middlewares/teacher_auth.middleware';
import * as ClassPreparationController from '../controllers/class-preparation.controller';
import { Router } from 'express';

const ClassPreparationRouter: Router = Router();

const route_prefix = '/class-preparation';

// TODO : add admin auth

ClassPreparationRouter.get(`${route_prefix}`, TeacherAuthMiddleware, ClassPreparationController.get_all);
ClassPreparationRouter.get(
	`${route_prefix}/:class_preparation_id/info`,
	TeacherAuthMiddleware,
	ClassPreparationController.get_info
);
ClassPreparationRouter.post(`${route_prefix}`, TeacherAuthMiddleware, ClassPreparationController.create);
ClassPreparationRouter.delete(`${route_prefix}`, TeacherAuthMiddleware, ClassPreparationController.destroy);
ClassPreparationRouter.put(
	`${route_prefix}/update/skills`,
	TeacherAuthMiddleware,
	ClassPreparationController.add_skills
);
ClassPreparationRouter.put(
	`${route_prefix}/update/apply`,
	TeacherAuthMiddleware,
	ClassPreparationController.add_apply
);
ClassPreparationRouter.put(
	`${route_prefix}/update/objectives`,
	TeacherAuthMiddleware,
	ClassPreparationController.add_objectives
);

ClassPreparationRouter.put(
	`${route_prefix}/update/is-confirm`,
	TeacherAuthMiddleware,
	ClassPreparationController.update_is_confirm
);

ClassPreparationRouter.get(
	`${route_prefix}/student`,
	StudentAuthMiddleware,
	ClassPreparationController.get_all_student
);
ClassPreparationRouter.get(
	`${route_prefix}/student/:class_preparation_id/info`,
	StudentAuthMiddleware,
	ClassPreparationController.get_info_student
);

export default ClassPreparationRouter;
