import { Application } from 'express';
import { BaseConfig } from '../config/base.config';
import AuthRouter from '../modules/auth/routes/auth.routes';
import ClassLevelRouter from '../modules/school_class/routes/class_level.routes';
import ClassRouter from '../modules/school_class/routes/class.routes';
import MajorRouter from '../modules/school_class/routes/major.routes';
import SchoolRouter from '../modules/school/routes/school.routes';
import TeacherRouter from '../modules/teacher/routes/teacher.routes';
import StudentRouter from '../modules/student/routes/student.routes';
import HomeWorkRouter from '../modules/home_work/routes/home_work.routes';
import StudentHomeWorkRouter from '../modules/home_work/routes/student_home_work.routes';
import NewsCategoryRouter from '../modules/news/routes/news_category.routes';
import NewsRouter from '../modules/news/routes/news.routes';
import FileRouter from '../modules/file-upload/routers/file.routes';
import SectionRouter from '../modules/school/routes/section.routes';
import StateRouter from '../modules/school/routes/state.routes';
import EventCategoryRouter from '../modules/schedule/routes/event_category.routes';
import ScheduleRouter from '../modules/schedule/routes/schedule.routes';
import AttendanceRouter from '../modules/attendance/routes/attendance.routes';
import AttendanceReasonRouter from '../modules/attendance/routes/attendance_reason.routes';
import ExamRouter from '../modules/exam/routes/exam.routes';
import ClassTimingRouter from '../modules/school_class/routes/class_timing.routes';
import ClassPreparationRouter from '../modules/class-preparation/routes/class-preparation.routes';
import PreparationRouter from '../modules/class-preparation/routes/preparation.routes';
import AdminRouter from '../modules/admin/routes/admin.router';
import AdminProfileRouter from '../modules/admin/routes/admin_profile.router';
import AdminAuthRouter from '../modules/admin-auth/routes/admin.auth.router';
import AdminTokenRouter from '../modules/admin-auth/routes/admin_token.router';
import AdminTeacherRouter from '../modules/teacher/routes/admin_teacher.routes';
import AdminSchoolRouter from '../modules/school/routes/admin_school.routes';
import AdminNewsRouter from '../modules/news/routes/admin_news.routes';
import AdminClassRouter from '../modules/school_class/routes/class_admin.routes';
import AdminNotificationRouter from '../modules/notification/routes/admin_notification.routes';
import NotificationRouter from '../modules/notification/routes/notification.routes';
import AdminLogsRouter from '../modules/log/routes/admin_logs.routes';
import TeacherLogsRouter from '../modules/log/routes/teacher_logs.routes';
export function RegisterRoutes(app: Application) {
	const routePrefix = `/api/v${BaseConfig.VERSION}`;

	// auth
	app.use(routePrefix, AuthRouter);

	// teacher
	app.use(routePrefix, TeacherRouter);

	// school class
	app.use(routePrefix, ClassLevelRouter);
	app.use(routePrefix, ClassRouter);
	app.use(routePrefix, MajorRouter);
	app.use(routePrefix, ClassTimingRouter);

	// school
	app.use(routePrefix, SchoolRouter);
	app.use(routePrefix, SectionRouter);
	app.use(routePrefix, StateRouter);

	// student
	app.use(routePrefix, StudentRouter);

	// Home Work
	app.use(routePrefix, HomeWorkRouter);
	app.use(routePrefix, StudentHomeWorkRouter);

	// News
	app.use(routePrefix, NewsCategoryRouter);
	app.use(routePrefix, NewsRouter);

	// File Upload
	app.use(routePrefix, FileRouter);

	// Schedule
	app.use(routePrefix, EventCategoryRouter);
	app.use(routePrefix, ScheduleRouter);

	// Attendance
	app.use(routePrefix, AttendanceRouter);
	app.use(routePrefix, AttendanceReasonRouter);

	// Exam
	app.use(routePrefix, ExamRouter);

	// Preparation
	app.use(routePrefix, ClassPreparationRouter);
	app.use(routePrefix, PreparationRouter);

	// Notification
	app.use(routePrefix, NotificationRouter);

	// Logs
	app.use(routePrefix, TeacherLogsRouter);

	//admin
	app.use(routePrefix, AdminRouter);
	app.use(routePrefix, AdminProfileRouter);
	app.use(routePrefix, AdminAuthRouter);
	app.use(routePrefix, AdminTokenRouter);
	app.use(routePrefix, AdminTeacherRouter);
	app.use(routePrefix, AdminSchoolRouter);
	app.use(routePrefix, AdminNewsRouter);
	app.use(routePrefix, AdminClassRouter);
	app.use(routePrefix, AdminNotificationRouter);
	app.use(routePrefix, AdminLogsRouter);
}
