import { AppLogger } from '../../../../lib/logger/Logger';
import StudentExamModel from '../../models/student_exam.model';
import { StudentExamBuilder } from './student_exam.builder';

export class StudentExamCreate {
	async create(builder: StudentExamBuilder): Promise<RestApi.ObjectResInterface> {
		try {
			const result = await StudentExamModel.create(
				{
					exam_id: builder.getExamId(),
					points: builder.getPoints(),
					class_id: builder.getClassId(),
					student_id: builder.getStudentId()
				},
				{
					isNewRecord: true
				}
			);

			return {
				is_success: !!result,
				data: result
			};
		} catch (error) {
			AppLogger.error('Error in StudentExamCreate create', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}
}
