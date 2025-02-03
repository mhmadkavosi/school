import { AdminAuthMiddleware } from '../../../middlewares/admin_auth.middleware';
import * as NewsController from '../controllers/news.controller';
import { Router } from 'express';

const AdminNewsRouter: Router = Router();

const route_prefix = '/admin/news';

AdminNewsRouter.get(`${route_prefix}/total`, AdminAuthMiddleware, NewsController.total_news);
AdminNewsRouter.get(
	`${route_prefix}/total/category`,
	AdminAuthMiddleware,
	NewsController.total_news_category
);

AdminNewsRouter.get(`${route_prefix}/all`, AdminAuthMiddleware, NewsController.get_all_news);

export default AdminNewsRouter;
