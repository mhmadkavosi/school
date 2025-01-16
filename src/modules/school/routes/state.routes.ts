import * as StateController from '../controllers/state.controller';
import { Router } from 'express';

const StateRouter: Router = Router();

const route_prefix = '/state';

StateRouter.get(route_prefix, StateController.get_all);
StateRouter.post(route_prefix, StateController.create_state);
StateRouter.get(`${route_prefix}/:state_id/info`, StateController.get_info_by_id);

export default StateRouter;
