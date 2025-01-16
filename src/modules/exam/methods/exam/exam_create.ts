import { AppLogger } from '../../../../lib/logger/Logger';
import ExamModel from '../../models/exam.model';
import { ExamBuilder } from './exam.builder';

export class ExamCreate {
	async create(builder: ExamBuilder): Promise<RestApi.ObjectResInterface> {
		try {
			const result = await ExamModel.create(
				{
					title: builder.getTitle(),
					date: builder.getDate(),
					start_hour: builder.getStartHour(),
					end_hour: builder.getEndHour(),
					description: builder.getDescription(),
					type: builder.getType(),
					teacher_id: builder.getTeacherId(),
					color: builder.getColor()
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
			AppLogger.error('Error in ExamCreate create', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}
}
