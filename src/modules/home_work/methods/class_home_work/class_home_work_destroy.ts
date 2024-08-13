import { AppLogger } from '../../../../lib/logger/Logger';
import ClassHomeWorkModel from '../../models/class_home_work.model';

export class ClassHomeWorkDestroy {
	async destroy_by_class_id(class_id: string): Promise<RestApi.ObjectResInterface> {
		try {
			const result = await ClassHomeWorkModel.destroy({ where: { class_id } });

			return {
				is_success: result === 0
			};
		} catch (error) {
			AppLogger.error('Error in ClassHomeWorkDestroy destroy', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}

	async destroy_by_home_work_id(home_work_id: string): Promise<RestApi.ObjectResInterface> {
		try {
			const result = await ClassHomeWorkModel.destroy({ where: { home_work_id } });

			return {
				is_success: result === 0
			};
		} catch (error) {
			AppLogger.error('Error in ClassHomeWorkDestroy destroy', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}
}
