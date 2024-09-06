import { AppLogger } from '../../../../lib/logger/Logger';
import ExamModel from '../../models/exam.model';

export class ExamDestroy {
	async destroy(id: string, teacher_id: string): Promise<RestApi.ObjectResInterface> {
		try {
			const result = await ExamModel.destroy({
				where: {
					id,
					teacher_id
				}
			});

			return {
				is_success: result === 0
			};
		} catch (error) {
			AppLogger.error('Error in ExamDestroy destroy', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}
}
