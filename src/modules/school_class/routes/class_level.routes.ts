import * as ClassLevelController from '../controllers/class_level.controller';
import { Router } from 'express';

const ClassLevelRouter: Router = Router();

const route_prefix = '/class-level';

ClassLevelRouter.get(route_prefix, ClassLevelController.get_all);
ClassLevelRouter.post(route_prefix, ClassLevelController.create_class_level);
ClassLevelRouter.get(`${route_prefix}/:class_level_id/info`, ClassLevelController.get_info_by_id);
ClassLevelRouter.get(`${route_prefix}/section/:section_id/info`, ClassLevelController.get_all_by_section_id);
ClassLevelRouter.delete(route_prefix, ClassLevelController.destroy);
ClassLevelRouter.put(route_prefix, ClassLevelController.update_class_level);

export default ClassLevelRouter;
