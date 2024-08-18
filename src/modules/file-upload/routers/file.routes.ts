import * as express from 'express';
import * as StreamController from '../controllers/stream.controller';
import * as DestroyController from '../controllers/destroy_file.controller';
import { file_upload } from '../../../lib/file_upload/aws/upload';
import { TeacherAuthMiddleware } from '../../../middlewares/teacher_auth.middleware';

const FileRouter = express.Router({});

const route_prefix = '/file';

FileRouter.route(route_prefix).post(
	[TeacherAuthMiddleware, file_upload().single('image')],
	StreamController.stream
);

FileRouter.route(route_prefix).delete(TeacherAuthMiddleware, DestroyController.destroy_file);

export default FileRouter;
