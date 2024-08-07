import { AppLogger } from '../../../../lib/logger/Logger';
import ClassesModel from '../../models/classes.model';

export class ClassUpdate {
	async update(
		id: string,
		teacher_id: string,
		school_id: string,
		major_id: string,
		class_level_id: string,
		count: number
	): Promise<RestApi.ObjectResInterface> {
		try {
			const result = await ClassesModel.update(
				{
					school_id,
					major_id,
					class_level_id,
					count
				},
				{ where: { id, teacher_id } }
			);

			return { is_success: result[0] > 0 };
		} catch (error) {
			AppLogger.error('Error in ClassUpdate update', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}
}
