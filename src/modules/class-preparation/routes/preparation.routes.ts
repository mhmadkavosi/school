import * as PreparationController from '../controllers/preparation.controller';
import { Router } from 'express';

const PreparationRouter: Router = Router();

const route_prefix = '/preparation';

PreparationRouter.get(`${route_prefix}`, PreparationController.get_all);
PreparationRouter.post(`${route_prefix}`, PreparationController.preparation_create);
PreparationRouter.post(`${route_prefix}/plan`, PreparationController.add_plan);
PreparationRouter.put(`${route_prefix}`, PreparationController.preparation_update);
PreparationRouter.delete(`${route_prefix}`, PreparationController.destroy_preparation);

export default PreparationRouter;
