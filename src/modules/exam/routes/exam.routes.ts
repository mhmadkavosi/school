import { TeacherAuthMiddleware } from '../../../middlewares/teacher_auth.middleware';
import * as ExamController from '../controllers/exam.controller';
import { Router } from 'express';

const ExamRouter: Router = Router();

const route_prefix = '/exam';

ExamRouter.get(`${route_prefix}`, TeacherAuthMiddleware, ExamController.create);
ExamRouter.put(`${route_prefix}/points`, TeacherAuthMiddleware, ExamController.add_points);
ExamRouter.delete(`${route_prefix}`, TeacherAuthMiddleware, ExamController.delete_exam);
ExamRouter.get(`${route_prefix}`, TeacherAuthMiddleware, ExamController.get_all);
ExamRouter.get(`${route_prefix}/class/:class_id/avg`, TeacherAuthMiddleware, ExamController.get_avg_exam);
ExamRouter.get(`${route_prefix}/counts`, TeacherAuthMiddleware, ExamController.get_count_of_exams);
ExamRouter.get(`${route_prefix}/info`, TeacherAuthMiddleware, ExamController.get_info);
ExamRouter.put(`${route_prefix}`, TeacherAuthMiddleware, ExamController.update_exam);

export default ExamRouter;
