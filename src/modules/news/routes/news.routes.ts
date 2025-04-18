import { StudentAuthMiddleware } from '../../../middlewares/student_auth.middleware';
import { TeacherAuthMiddleware } from '../../../middlewares/teacher_auth.middleware';
import * as NewsController from '../controllers/news.controller';
import { Router } from 'express';

const NewsRouter: Router = Router();

const route_prefix = '/news';

NewsRouter.post(route_prefix, TeacherAuthMiddleware, NewsController.create);
NewsRouter.put(route_prefix, TeacherAuthMiddleware, NewsController.update);
NewsRouter.delete(route_prefix, TeacherAuthMiddleware, NewsController.destroy);
NewsRouter.get(`${route_prefix}/category/info`, NewsController.get_all_news_by_category_id);
NewsRouter.get(`${route_prefix}/school/info`, NewsController.get_all_news_by_school_id);
NewsRouter.get(`${route_prefix}/:news_id/details`, NewsController.get_info);
NewsRouter.get(`${route_prefix}/school/:class_id/count`, NewsController.get_count_of_news);
NewsRouter.get(
	`${route_prefix}/student/all`,
	StudentAuthMiddleware,
	NewsController.get_all_news_by_student_id
);
NewsRouter.get(
	`${route_prefix}/student/count`,
	StudentAuthMiddleware,
	NewsController.get_count_news_by_student_id
);

NewsRouter.put(`${route_prefix}/file`, TeacherAuthMiddleware, NewsController.update_file);
NewsRouter.delete(`${route_prefix}/file`, TeacherAuthMiddleware, NewsController.delete_file);

export default NewsRouter;
