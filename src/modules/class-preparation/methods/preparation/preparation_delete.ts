import { AppLogger } from '../../../../lib/logger/Logger';
import PreparationModel from '../../models/preparation.model';

export class PreparationDestroy {
	async destroy(id: string): Promise<RestApi.ObjectResInterface> {
		try {
			const result = await PreparationModel.destroy({
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
}
