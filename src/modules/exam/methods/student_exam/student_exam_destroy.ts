import { AppLogger } from '../../../../lib/logger/Logger';
import StudentExamModel from '../../models/student_exam.model';

export class StudentExamDestroy {
	async destroy_by_exam_id(exam_id: string): Promise<RestApi.ObjectResInterface> {
		try {
			await StudentExamModel.destroy({ where: { exam_id } });

			return { is_success: true };
		} catch (error) {
			AppLogger.error('Error in StudentExamDestroy destroy', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}

	async destroy_by_student_id(student_id: string): Promise<RestApi.ObjectResInterface> {
		try {
			await StudentExamModel.destroy({ where: { student_id } });

			return { is_success: true };
		} catch (error) {
			AppLogger.error('Error in StudentExamDestroy destroy', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}
}
