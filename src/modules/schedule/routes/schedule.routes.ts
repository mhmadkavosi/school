import { TeacherAuthMiddleware } from '../../../middlewares/teacher_auth.middleware';
import * as ScheduleController from '../controllers/schedule.controller';
import { Router } from 'express';

const ScheduleRouter: Router = Router();

const route_prefix = '/schedule';

ScheduleRouter.post(route_prefix, TeacherAuthMiddleware, ScheduleController.create);
ScheduleRouter.put(route_prefix, TeacherAuthMiddleware, ScheduleController.update);
ScheduleRouter.post(`${route_prefix}/assign`, TeacherAuthMiddleware, ScheduleController.add_schedule_assign);
ScheduleRouter.delete(route_prefix, TeacherAuthMiddleware, ScheduleController.delete_schedule);
ScheduleRouter.delete(
	`${route_prefix}/assign`,
	TeacherAuthMiddleware,
	ScheduleController.delete_schedule_assign
);

ScheduleRouter.get(route_prefix, TeacherAuthMiddleware, ScheduleController.get_all);
ScheduleRouter.get(`${route_prefix}/:schedule_id/info`, TeacherAuthMiddleware, ScheduleController.get_by_id);

export default ScheduleRouter;
