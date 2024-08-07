import { TeacherAuthMiddleware } from '../../../middlewares/teacher_auth.middleware';
import * as SchoolController from '../controllers/school.controller';
import { Router } from 'express';

const SchoolRouter: Router = Router();

const route_prefix = '/school';

SchoolRouter.get(route_prefix, TeacherAuthMiddleware, SchoolController.get_all);
SchoolRouter.get(`${route_prefix}/:shool_id/info`, TeacherAuthMiddleware, SchoolController.get_info_by_id);
SchoolRouter.post(route_prefix, TeacherAuthMiddleware, SchoolController.create_school);
SchoolRouter.put(route_prefix, TeacherAuthMiddleware, SchoolController.update_school);

export default SchoolRouter;
