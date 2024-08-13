import { AppLogger } from '../../../../lib/logger/Logger';
import ClassHomeWorkModel from '../../models/class_home_work.model';

export class ClassHomeWorkCreate {
	async create(class_id: string, home_work_id: string): Promise<RestApi.ObjectResInterface> {
		try {
			const result = await ClassHomeWorkModel.create({ class_id, home_work_id }, { isNewRecord: true });

			return {
				is_success: !!result,
				data: result
			};
		} catch (error) {
			AppLogger.error('Error in ClassHomeWorkCreate create', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}
}
