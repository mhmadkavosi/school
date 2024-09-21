import { AppLogger } from '../../../../lib/logger/Logger';
import ClassLevelModel from '../../models/class_level.model';

export class ClassLevelDestroy {
	async destroy(id: string): Promise<RestApi.ObjectResInterface> {
		try {
			const result = await ClassLevelModel.destroy({ where: { id } });

			return {
				is_success: true
			};
		} catch (error) {
			AppLogger.error('Error in ClassLevelDestroy destroy', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}
}
