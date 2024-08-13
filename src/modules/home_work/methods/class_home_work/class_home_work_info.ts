import { AppLogger } from '../../../../lib/logger/Logger';
import ClassHomeWorkModel from '../../models/class_home_work.model';

export class ClassHomeWorkInfo {
	async get_info(class_id: string, home_work_id: string): Promise<RestApi.ObjectResInterface> {
		try {
			const result = await ClassHomeWorkModel.findOne({ where: { class_id, home_work_id } });

			return {
				is_success: !!result,
				data: result
			};
		} catch (error) {
			AppLogger.error('Error in ClassHomeWorkInfo get_info', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}
}
