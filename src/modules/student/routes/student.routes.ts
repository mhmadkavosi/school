import * as StudentController from '../controllers/student.controller';
import { Router } from 'express';

const StudentRouter: Router = Router();

const route_prefix = '/student';

StudentRouter.post(route_prefix, StudentController.create);
StudentRouter.delete(route_prefix, StudentController.delete_student);
StudentRouter.put(route_prefix, StudentController.update);

StudentRouter.put(`${route_prefix}/profile-picture`, StudentController.update_profile_picture);
StudentRouter.delete(`${route_prefix}/profile-picture`, StudentController.delete_profile_picture);

StudentRouter.get(`${route_prefix}/class/all`, StudentController.get_all_student_of_class);
StudentRouter.get(`${route_prefix}/class/search`, StudentController.get_all_student_of_class_with_search);

StudentRouter.get(`${route_prefix}/:student_id/info`, StudentController.get_info);

export default StudentRouter;
