import { AppLogger } from '../../../../lib/logger/Logger';
import HomeWorkModel from '../../models/home_work.model';

export class HomeWorkInfo {
	async get_all_home_work_of_teacher(teacher_id: string): Promise<RestApi.ObjectResInterface> {
		try {
			const result = await HomeWorkModel.findAll({
				where: { teacher_id }
			});

			return {
				is_success: true,
				data: result
			};
		} catch (error) {
			AppLogger.error('Error in HomeWorkInfo get_all_home_work_of_teacher', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}
}