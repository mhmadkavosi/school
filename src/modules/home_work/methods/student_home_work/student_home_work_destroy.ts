import { AppLogger } from '../../../../lib/logger/Logger';
import StudentHomeWorkModel from '../../models/student_home_work.model';

export class StudentHomeWorDestroy {
	async destroy_by_home_work_id(home_work_id: string): Promise<RestApi.ObjectResInterface> {
		try {
			await StudentHomeWorkModel.destroy({ where: { home_work_id } });

			return { is_success: true };
		} catch (error) {
			AppLogger.error('Error in StudentHomeWorDestroy destroy', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}

	async destroy_by_student_id(student_id: string): Promise<RestApi.ObjectResInterface> {
		try {
			await StudentHomeWorkModel.destroy({ where: { student_id } });

			return { is_success: true };
		} catch (error) {
			AppLogger.error('Error in StudentHomeWorDestroy destroy', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}
}
