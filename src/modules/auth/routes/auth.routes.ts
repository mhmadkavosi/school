import { TeacherAuthMiddleware } from '../../../middlewares/teacher_auth.middleware';
import * as TeacherLoginController from '../controllers/teacher_login.controller';
import * as TeacherLogoutController from '../controllers/teacher_logout.controller';
import * as TeacherRegisterController from '../controllers/teacher_register.controller';
import * as TeacherGoogleAuthController from '../controllers/google_oauth.controller';

import { Router } from 'express';

const AuthRouter: Router = Router();

const route_prefix = '/auth';

AuthRouter.post(`${route_prefix}/teacher/login/request`, TeacherLoginController.login_request);
AuthRouter.post(`${route_prefix}/teacher/login/confirm`, TeacherLoginController.login_confirm);
AuthRouter.post(`${route_prefix}/teacher/register/request`, TeacherRegisterController.register_request);
AuthRouter.post(`${route_prefix}/teacher/register/confirm`, TeacherRegisterController.register_confirm);
AuthRouter.post(
	`${route_prefix}/teacher/register/confirm/password`,
	TeacherRegisterController.confirm_password
);
AuthRouter.get(`${route_prefix}/teacher/logout`, TeacherAuthMiddleware, TeacherLogoutController.logout);

AuthRouter.post(`${route_prefix}/teacher/google`, TeacherGoogleAuthController.google_auth);

export default AuthRouter;
