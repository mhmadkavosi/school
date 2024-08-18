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

	async update_add_file(id: string, file: string, file_type: string): Promise<RestApi.ObjectResInterface> {
		try {
			const result = await HomeWorkModel.update({ file, file_type }, { where: { id } });

			return {
				is_success: result[0] > 0
			};
		} catch (error) {
			AppLogger.error('Error in HomeWorkUpdate update_add_file', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}

	async remove_file(id: string): Promise<RestApi.ObjectResInterface> {
		try {
			const result = await HomeWorkModel.update({ file: null, file_type: null }, { where: { id } });

			return {
				is_success: result[0] > 0
			};
		} catch (error) {
			AppLogger.error('Error in HomeWorkUpdate remove_file', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}
}
