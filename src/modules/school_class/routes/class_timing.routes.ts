import * as ClassTimingController from '../controllers/class_timing.controller';
import { Router } from 'express';

const ClassTimingRouter: Router = Router();

const route_prefix = '/class-timing';

ClassTimingRouter.get(`${route_prefix}/:class_id/all`, ClassTimingController.get_all);
ClassTimingRouter.get(`${route_prefix}/class/time`, ClassTimingController.get_class_time);
ClassTimingRouter.post(route_prefix, ClassTimingController.create);
ClassTimingRouter.get(`${route_prefix}/:class_timing_id/info`, ClassTimingController.get_info);
ClassTimingRouter.put(`${route_prefix}`, ClassTimingController.update);
ClassTimingRouter.delete(`${route_prefix}`, ClassTimingController.destroy);

export default ClassTimingRouter;
