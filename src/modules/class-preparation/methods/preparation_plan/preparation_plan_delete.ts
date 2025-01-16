import { AppLogger } from '../../../../lib/logger/Logger';
import PreparationPlanModel from '../../models/preparation_plan.model';

export class PreparationPlanDestroy {
	async destroy(id: string): Promise<RestApi.ObjectResInterface> {
		try {
			const result = await PreparationPlanModel.destroy({
				where: {
					id
				}
			});

			return {
				is_success: result === 0
			};
		} catch (error) {
			AppLogger.error('Error in ClassPreparationAssignDestroy destroy', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}

	async destroy_preparation_id(preparation_id: string): Promise<RestApi.ObjectResInterface> {
		try {
			const result = await PreparationPlanModel.destroy({
				where: {
					preparation_id
				}
			});

			return {
				is_success: result === 0
			};
		} catch (error) {
			AppLogger.error('Error in ClassPreparationAssignDestroy destroy', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}
}
