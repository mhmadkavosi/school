import * as express from 'express';
import * as StreamController from '../controllers/stream.controller';
import * as DestroyController from '../controllers/destroy_file.controller';
import { file_upload } from '../../../lib/file_upload/aws/upload';
import { TeacherAuthMiddleware } from '../../../middlewares/teacher_auth.middleware';
import { AdminAuthMiddleware } from '../../../middlewares/admin_auth.middleware';
import { StudentAuthMiddleware } from '../../../middlewares/student_auth.middleware';

const FileRouter = express.Router({});

const route_prefix = '/file';

FileRouter.route(route_prefix).post(
	[TeacherAuthMiddleware, file_upload().single('image')],
	StreamController.stream
);

FileRouter.route(`/admin${route_prefix}`).post(
	[AdminAuthMiddleware, file_upload().single('image')],
	StreamController.stream
);

FileRouter.route(`/student${route_prefix}`).post(
	[StudentAuthMiddleware, file_upload().single('image')],
	StreamController.stream
);

FileRouter.route(route_prefix).delete(TeacherAuthMiddleware, DestroyController.destroy_file);
FileRouter.route(`/admin${route_prefix}`).delete(AdminAuthMiddleware, DestroyController.destroy_file);
FileRouter.route(`/student${route_prefix}`).delete(StudentAuthMiddleware, DestroyController.destroy_file);

export default FileRouter;
