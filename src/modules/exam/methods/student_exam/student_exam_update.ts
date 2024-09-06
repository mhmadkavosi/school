import { AppLogger } from '../../../../lib/logger/Logger';
import StudentExamModel from '../../models/student_exam.model';

export class StudentExamUpdate {
	async add_points(exam_id: string, student_id: string, points: number): Promise<RestApi.ObjectResInterface> {
		try {
			const result = await StudentExamModel.update({ points }, { where: { exam_id, student_id } });

			return {
				is_success: result[0] > 0
			};
		} catch (error) {
			AppLogger.error('Error in StudentExamUpdate add_points', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}
}
