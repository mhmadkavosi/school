import { StudentAuthMiddleware } from '../../../middlewares/student_auth.middleware';
import { TeacherAuthMiddleware } from '../../../middlewares/teacher_auth.middleware';
import * as ExamController from '../controllers/exam.controller';
import { Router } from 'express';

const ExamRouter: Router = Router();

const route_prefix = '/exam';

ExamRouter.post(`${route_prefix}`, TeacherAuthMiddleware, ExamController.create);
ExamRouter.put(`${route_prefix}/points`, TeacherAuthMiddleware, ExamController.add_points);
ExamRouter.delete(`${route_prefix}`, TeacherAuthMiddleware, ExamController.delete_exam);
ExamRouter.get(`${route_prefix}`, TeacherAuthMiddleware, ExamController.get_all);

ExamRouter.get(
	`${route_prefix}/student/:student_id/avg`,
	TeacherAuthMiddleware,
	ExamController.get_avg_student
);

ExamRouter.get(`${route_prefix}/avg/all`, TeacherAuthMiddleware, ExamController.get_avg_all_class);

ExamRouter.get(`${route_prefix}/counts`, TeacherAuthMiddleware, ExamController.get_count_of_exams);
ExamRouter.get(`${route_prefix}/info`, TeacherAuthMiddleware, ExamController.get_info);
ExamRouter.put(`${route_prefix}`, TeacherAuthMiddleware, ExamController.update_exam);

ExamRouter.get(`${route_prefix}/class/:class_id/avg`, ExamController.get_avg_class);
ExamRouter.get(`${route_prefix}/:exam_id/avg`, ExamController.get_avg_exam);

ExamRouter.get(`${route_prefix}/student/all`, StudentAuthMiddleware, ExamController.get_all_student_exam);
ExamRouter.get(`${route_prefix}/student/info`, StudentAuthMiddleware, ExamController.get_info_student);
ExamRouter.get(`${route_prefix}/student/list`, StudentAuthMiddleware, ExamController.get_list_of_students);
ExamRouter.get(`${route_prefix}/student/list/check`, StudentAuthMiddleware, ExamController.get_total_check);

export default ExamRouter;
