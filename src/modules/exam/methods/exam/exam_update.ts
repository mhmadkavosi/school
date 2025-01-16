import { AppLogger } from '../../../../lib/logger/Logger';
import ExamModel from '../../models/exam.model';

export class ExamUpdate {
	async update(
		id: string,
		title: string,
		date: string,
		start_hour: string,
		end_hour: string,
		description: string,
		type: string,
		color: string
	): Promise<RestApi.ObjectResInterface> {
		try {
			const result = await ExamModel.update(
				{
					title,
					date,
					start_hour,
					end_hour,
					description,
					type,
					color
				},
				{
					where: {
						id
					}
				}
			);

			return {
				is_success: result[0] > 0
			};
		} catch (error) {
			AppLogger.error('Error in ExamUpdate update', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}
}
