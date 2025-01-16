import { AppLogger } from '../../../../lib/logger/Logger';
import ExamClassModel from '../../models/exam_class.mode';

export class ExamClassCreate {
	async create(class_id: string, exam_id: string): Promise<RestApi.ObjectResInterface> {
		try {
			const result = await ExamClassModel.create({ class_id, exam_id }, { isNewRecord: true });

			return {
				is_success: !!result,
				data: result
			};
		} catch (error) {
			AppLogger.error('Error in ExamClassCreate create', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}
}
