import * as StudentController from '../controllers/student.controller';
import { Router } from 'express';

const StudentRouter: Router = Router();

const route_prefix = '/student';

StudentRouter.post(route_prefix, StudentController.create);
StudentRouter.delete(route_prefix, StudentController.delete_student);
StudentRouter.put(route_prefix, StudentController.update);

StudentRouter.get(`${route_prefix}/class/all`, StudentController.get_all_student_of_class);
StudentRouter.get(`${route_prefix}/:student_id/info`, StudentController.get_info);

export default StudentRouter;
