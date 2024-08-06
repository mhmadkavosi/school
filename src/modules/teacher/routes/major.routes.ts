import * as MajorController from '../controllers/major.controller';
import { Router } from 'express';

const MajorRouter: Router = Router();

const route_prefix = '/major';

MajorRouter.get(route_prefix, MajorController.get_all);
MajorRouter.post(route_prefix, MajorController.create_major);
MajorRouter.get(`${route_prefix}/:major_id/info`, MajorController.get_info_by_id);

export default MajorRouter;
