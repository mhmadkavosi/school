import { TeacherAuthMiddleware } from '../../../middlewares/teacher_auth.middleware';
import * as TeacherLogsController from '../controller/teacher_logs.controller';
import { Router } from 'express';

const TeacherLogsRouter: Router = Router();

const route_prefix = '/teacher/logs';

TeacherLogsRouter.get(`${route_prefix}`, TeacherAuthMiddleware, TeacherLogsController.get_all);
export default TeacherLogsRouter;
