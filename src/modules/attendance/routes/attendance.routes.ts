import { StudentAuthMiddleware } from '../../../middlewares/student_auth.middleware';
import { TeacherAuthMiddleware } from '../../../middlewares/teacher_auth.middleware';
import * as AttendanceController from '../controllers/attendance.controller';
import { Router } from 'express';

const AttendanceRouter: Router = Router();

const route_prefix = '/attendance';

AttendanceRouter.get(`${route_prefix}`, TeacherAuthMiddleware, AttendanceController.get_all);
AttendanceRouter.put(
	`${route_prefix}/delay-time`,
	TeacherAuthMiddleware,
	AttendanceController.add_delay_time
);
AttendanceRouter.put(`${route_prefix}/reason`, TeacherAuthMiddleware, AttendanceController.add_reason);
AttendanceRouter.put(
	`${route_prefix}/attendance-type`,
	TeacherAuthMiddleware,
	AttendanceController.update_attendance_type
);
AttendanceRouter.post(`${route_prefix}`, TeacherAuthMiddleware, AttendanceController.create);
AttendanceRouter.get(
	`${route_prefix}/attendance-type/info`,
	TeacherAuthMiddleware,
	AttendanceController.get_by_attendance_type
);
AttendanceRouter.get(
	`${route_prefix}/counts/:class_id/info`,
	TeacherAuthMiddleware,
	AttendanceController.get_counts
);
AttendanceRouter.get(
	`${route_prefix}/:attendance_id/info`,
	TeacherAuthMiddleware,
	AttendanceController.get_info
);

AttendanceRouter.get(
	`${route_prefix}/student/all`,
	StudentAuthMiddleware,
	AttendanceController.get_all_for_student
);

export default AttendanceRouter;
