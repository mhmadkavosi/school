import { AppLogger } from '../../../../lib/logger/Logger';
import ClassTimingModel from '../../models/class_timing.mode';

export class ClassTimingInfo {
	async get_all_by_class_id(class_id: string): Promise<RestApi.ObjectResInterface> {
		try {
			const result = await ClassTimingModel.findAll({ where: { class_id } });

			return {
				is_success: !!result,
				data: result
			};
		} catch (error) {
			AppLogger.error('Error in ClassTimingInfo get_all_by_class_id', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}

	async get_info_by_id(id: string): Promise<RestApi.ObjectResInterface> {
		try {
			const result = await ClassTimingModel.findOne({ where: { id } });

			return {
				is_success: !!result,
				data: result
			};
		} catch (error) {
			AppLogger.error('Error in ClassTimingInfo get_by_id', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}
}
