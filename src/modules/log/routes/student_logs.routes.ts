import { StudentAuthMiddleware } from '../../../middlewares/student_auth.middleware';
import * as StudentLogsController from '../controller/student_logs.controller';
import { Router } from 'express';

const StudentLogsRouter: Router = Router();

const route_prefix = '/student/logs';

StudentLogsRouter.get(`${route_prefix}`, StudentAuthMiddleware, StudentLogsController.get_all);
export default StudentLogsRouter;
