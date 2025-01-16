import { TeacherAuthMiddleware } from '../../../middlewares/teacher_auth.middleware';
import * as NewsCategoryController from '../controllers/news_category.controller';
import { Router } from 'express';

const NewsCategoryRouter: Router = Router();

const route_prefix = '/news-category';

NewsCategoryRouter.post(route_prefix, TeacherAuthMiddleware, NewsCategoryController.create);
NewsCategoryRouter.put(route_prefix, TeacherAuthMiddleware, NewsCategoryController.update);
NewsCategoryRouter.get(`${route_prefix}`, NewsCategoryController.get_all);
NewsCategoryRouter.get(`${route_prefix}/:news_category_id/info`, NewsCategoryController.get_info);

export default NewsCategoryRouter;
