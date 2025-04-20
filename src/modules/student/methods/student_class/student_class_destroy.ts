import { AppLogger } from '../../../../lib/logger/Logger';
import StudentClassesModel from '../../models/student_class.model';

export class StudentClassDestroy {
	async destroy_by_class_id(class_id: string): Promise<RestApi.ObjectResInterface> {
		try {
			await StudentClassesModel.destroy({ where: { class_id } });

			return { is_success: true };
		} catch (error) {
			AppLogger.error('Error in StudentClassDestroy destroy_by_class_id', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}

	async destroy_by_student_id(student_id: string): Promise<RestApi.ObjectResInterface> {
		try {
			await StudentClassesModel.destroy({ where: { student_id } });

			return { is_success: true };
		} catch (error) {
			AppLogger.error('Error in StudentClassDestroy destroy_by_student_id', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}

	async destroy(class_id: string, student_id: string): Promise<RestApi.ObjectResInterface> {
		try {
			await StudentClassesModel.destroy({ where: { class_id, student_id } });

			return { is_success: true };
		} catch (error) {
			AppLogger.error('Error in StudentClassDestroy destroy_by_class_id', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}
}
