import * as express from 'express';
import * as StudentAuthController from '../controllers/student_auth.controller';
import { AdminAuthMiddleware } from '../../../middlewares/admin_auth.middleware';

const StudentAuthRouter = express.Router();

const route_prefix = '/student/auth';

StudentAuthRouter.post(`${route_prefix}/login`, StudentAuthController.login);
StudentAuthRouter.post(`${route_prefix}/logout`, AdminAuthMiddleware, StudentAuthController.logout);

export default StudentAuthRouter;
