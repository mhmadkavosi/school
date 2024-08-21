import * as EventCategoryController from '../controllers/event_category.controller';
import { Router } from 'express';

const EventCategoryRouter: Router = Router();

const route_prefix = '/event-category';

EventCategoryRouter.get(route_prefix, EventCategoryController.get_all);
EventCategoryRouter.post(route_prefix, EventCategoryController.create_event_category);
EventCategoryRouter.get(`${route_prefix}/:event_category_id/info`, EventCategoryController.get_info_by_id);

export default EventCategoryRouter;
