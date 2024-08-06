import { Application } from 'express';
import { BaseConfig } from '../config/base.config';
import AuthRouter from '../modules/auth/routes/auth.routes';
import ClassLevelRouter from '../modules/teacher/routes/class_level.routes';
import ClassRouter from '../modules/teacher/routes/class.routes';
import MajorRouter from '../modules/teacher/routes/major.routes';
import SchoolRouter from '../modules/teacher/routes/school.routes';
import TeacherRouter from '../modules/teacher/routes/teacher.routes';
export function RegisterRoutes(app: Application) {
	const routePrefix = `/api/v${BaseConfig.VERSION}`;

	// auth
	app.use(routePrefix, AuthRouter);

	// teacher
	app.use(routePrefix, ClassLevelRouter);
	app.use(routePrefix, ClassRouter);
	app.use(routePrefix, MajorRouter);
	app.use(routePrefix, SchoolRouter);
	app.use(routePrefix, TeacherRouter);
}
