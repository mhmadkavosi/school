import { AppLogger } from '../../../../lib/logger/Logger';
import ClassTimingModel from '../../models/class_timing.mode';

export class ClassTimingDestroy {
	async destroy(id: string): Promise<RestApi.ObjectResInterface> {
		try {
			const result = await ClassTimingModel.destroy({ where: { id } });

			return {
				is_success: true
			};
		} catch (error) {
			AppLogger.error('Error in ClassTimingDestroy destroy', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}
}
