import { Application } from 'express';
import { BaseConfig } from '../config/base.config';
import AuthRouter from '../modules/auth/routes/auth.routes';
import ClassLevelRouter from '../modules/school_class/routes/class_level.routes';
import ClassRouter from '../modules/school_class/routes/class.routes';
import MajorRouter from '../modules/school_class/routes/major.routes';
import SchoolRouter from '../modules/school/routes/school.routes';
import TeacherRouter from '../modules/teacher/routes/teacher.routes';
import StudentRouter from '../modules/student/routes/student.routes';
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

	// school
	app.use(routePrefix, SchoolRouter);

	// student
	app.use(routePrefix, StudentRouter);
}
