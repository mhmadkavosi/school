import * as express from 'express';
import * as StudentTokenController from '../controllers/student_user_token.controller';
import { StudentAuthMiddleware } from '../../../middlewares/student_auth.middleware';

const StudentTokenRouter = express.Router();

const route_prefix = '/student/token';

StudentTokenRouter.get(route_prefix, StudentAuthMiddleware, StudentTokenController.get_all_student_token);

StudentTokenRouter.delete(route_prefix, StudentAuthMiddleware, StudentTokenController.remove_user_token);

StudentTokenRouter.delete(
	`${route_prefix}/all`,
	StudentAuthMiddleware,
	StudentTokenController.terminate_all_tokens
);

export default StudentTokenRouter;
