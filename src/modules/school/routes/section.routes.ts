import * as SectionController from '../controllers/section.controller';
import { Router } from 'express';

const SectionRouter: Router = Router();

const route_prefix = '/section';

SectionRouter.get(route_prefix, SectionController.get_all);
SectionRouter.post(route_prefix, SectionController.create_section);
SectionRouter.get(`${route_prefix}/:section_id/info`, SectionController.get_info_by_id);

export default SectionRouter;
