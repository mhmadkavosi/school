import { AppLogger } from '../../../../lib/logger/Logger';
import ExamClassModel from '../../models/exam_class.mode';

export class ExamClassDestroy {
	async destroy_by_class_id(class_id: string): Promise<RestApi.ObjectResInterface> {
		try {
			const result = await ExamClassModel.destroy({ where: { class_id } });

			return {
				is_success: result === 0
			};
		} catch (error) {
			AppLogger.error('Error in ExamClassDestroy destroy', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}

	async destroy_by_exam_id(exam_id: string): Promise<RestApi.ObjectResInterface> {
		try {
			const result = await ExamClassModel.destroy({ where: { exam_id } });

			return {
				is_success: result === 0
			};
		} catch (error) {
			AppLogger.error('Error in ExamClassDestroy destroy', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}
}
