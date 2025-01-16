import { AppLogger } from '../../../../lib/logger/Logger';
import StudentHomeWorkModel from '../../models/student_home_work.model';
import { StudentHomeWorkBuilder } from './student_home_work.builder';

export class StudentHomeWorkCreate {
	async create(builder: StudentHomeWorkBuilder): Promise<RestApi.ObjectResInterface> {
		try {
			const result = await StudentHomeWorkModel.create(
				{
					class_home_work_id: builder.getClassHomeWorkId(),
					home_work_id: builder.getHomeWorkId(),
					student_id: builder.getStudentId(),
					status: builder.getStatus(),
					score: builder.getScore(),
					status_description: builder.getStatusDescription(),
					status_time: builder.getStatusTime()
				},
				{ isNewRecord: true }
			);

			return {
				is_success: !!result,
				data: result
			};
		} catch (error) {
			AppLogger.error('Error in StudentHomeWorkCreate create', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}
}
