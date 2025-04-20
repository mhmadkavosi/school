import { AppLogger } from '../../../../lib/logger/Logger';
import StudentClassesModel from '../../models/student_class.model';

export class StudentClassInfo {
	async get_info_by_student_and_class_id(
		student_id: string,
		class_id: string
	): Promise<RestApi.ObjectResInterface> {
		try {
			const result = await StudentClassesModel.findOne({
				where: {
					student_id,
					class_id
				}
			});

			return {
				is_success: !!result,
				data: result
			};
		} catch (error) {
			AppLogger.error('Error in StudentClassInfo get_info_by_student_and_class_id', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}
}
