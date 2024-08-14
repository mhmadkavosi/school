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

export default NewsRouter;
