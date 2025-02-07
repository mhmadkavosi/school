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

AdminNewsRouter.get(`${route_prefix}/category/info`, NewsController.get_all_news_by_category_id);
AdminNewsRouter.get(`${route_prefix}/school/info`, NewsController.get_all_news_by_school_id);
AdminNewsRouter.get(`${route_prefix}/:news_id/details`, NewsController.get_info);
AdminNewsRouter.get(`${route_prefix}/school/:school/count`, NewsController.get_count_of_news_by_shool_id);

AdminNewsRouter.put(`${route_prefix}/file`, AdminAuthMiddleware, NewsController.update_file);
AdminNewsRouter.delete(`${route_prefix}/file`, AdminAuthMiddleware, NewsController.delete_file);
export default AdminNewsRouter;
