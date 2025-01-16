import { AppLogger } from '../../../../lib/logger/Logger';
import HomeWorkModel from '../../models/home_work.model';

export class HomeWorkDestroy {
	async destroy(id: string): Promise<RestApi.ObjectResInterface> {
		try {
			const result = await HomeWorkModel.destroy({ where: { id } });

			return {
				is_success: result === 0
			};
		} catch (error) {
			AppLogger.error('Error in HomeWorkDestroy destroy', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}
}
