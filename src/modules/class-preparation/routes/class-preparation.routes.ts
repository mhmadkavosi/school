import { TeacherAuthMiddleware } from '../../../middlewares/teacher_auth.middleware';
import * as ClassPreparationController from '../controllers/class-preparation.controller';
import { Router } from 'express';

const ClassPreparationRouter: Router = Router();

const route_prefix = '/class-preparation';

ClassPreparationRouter.get(`${route_prefix}`, TeacherAuthMiddleware, ClassPreparationController.get_all);
ClassPreparationRouter.get(
	`${route_prefix}/:class_preparation_id/info`,
	TeacherAuthMiddleware,
	ClassPreparationController.get_info
);
ClassPreparationRouter.post(`${route_prefix}`, TeacherAuthMiddleware, ClassPreparationController.create);
ClassPreparationRouter.delete(`${route_prefix}`, TeacherAuthMiddleware, ClassPreparationController.destroy);
ClassPreparationRouter.put(`${route_prefix}`, TeacherAuthMiddleware, ClassPreparationController.update);

export default ClassPreparationRouter;
