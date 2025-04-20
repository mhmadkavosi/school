import { AppLogger } from '../../../../lib/logger/Logger';
import StudentClassModel from '../../models/student_class.model';

export class StudentClassCreate {
	async create(student_id: string, class_id: string): Promise<RestApi.ObjectResInterface> {
		try {
			const result = await StudentClassModel.create({ student_id, class_id }, { isNewRecord: true });

			return {
				is_success: !!result,
				data: result
			};
		} catch (error) {
			AppLogger.error('Error in StudentClassCreate create', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}
}
