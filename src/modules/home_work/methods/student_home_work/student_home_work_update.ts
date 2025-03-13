import { AppLogger } from '../../../../lib/logger/Logger';
import { StudentHomeWorkStatusEnum } from '../../models/enums/student_home_work.enum';
import StudentHomeWorkModel from '../../models/student_home_work.model';

export class StudentHomeWorkUpdate {
	async add_desc(
		id: string,
		status_description: string,
		status_time: Date
	): Promise<RestApi.ObjectResInterface> {
		try {
			const result = await StudentHomeWorkModel.update(
				{ status_time, status_description },
				{ where: { id } }
			);

			return {
				is_success: result[0] > 0
			};
		} catch (error) {
			AppLogger.error('Error in StudentHomeWorkUpdate add_desc', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}

	async add_score(id: string, score: number): Promise<RestApi.ObjectResInterface> {
		try {
			const result = await StudentHomeWorkModel.update({ score }, { where: { id } });

			return {
				is_success: result[0] > 0
			};
		} catch (error) {
			AppLogger.error('Error in StudentHomeWorkUpdate add_score', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}

	async update_status(id: string, status: StudentHomeWorkStatusEnum): Promise<RestApi.ObjectResInterface> {
		try {
			const result = await StudentHomeWorkModel.update({ status }, { where: { id } });

			return {
				is_success: result[0] > 0
			};
		} catch (error) {
			AppLogger.error('Error in StudentHomeWorkUpdate update_status', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}

	async update_status_student(
		student_id: string,
		status: StudentHomeWorkStatusEnum,
		home_work_id: string
	): Promise<RestApi.ObjectResInterface> {
		try {
			const result = await StudentHomeWorkModel.update({ status }, { where: { student_id, home_work_id } });

			return {
				is_success: result[0] > 0
			};
		} catch (error) {
			AppLogger.error('Error in StudentHomeWorkUpdate update_status', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}
}
