import { AppLogger } from '../../../../lib/logger/Logger';
import HomeWorkModel from '../../models/home_work.model';

export class HomeWorkUpdate {
	async update(
		id: string,
		teacher_id: string,
		title: string,
		start_date: string,
		end_date: string,
		description: string,
		file: string,
		max_score: string,
		min_score: string
	): Promise<RestApi.ObjectResInterface> {
		try {
			const result = await HomeWorkModel.update(
				{
					title,
					start_date,
					end_date,
					description,
					file,
					max_score,
					min_score
				},
				{ where: { id, teacher_id } }
			);

			return {
				is_success: result[0] > 0
			};
		} catch (error) {
			AppLogger.error('Error in HomeWorkUpdate update', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}
}
