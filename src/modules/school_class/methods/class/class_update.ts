import { AppLogger } from '../../../../lib/logger/Logger';
import ClassesModel from '../../models/classes.model';

export class ClassUpdate {
	async update(
		id: string,
		teacher_id: string,
		school_id: string,
		class_level_id: string,
		count: number,
		name: string,
		major: string,
		major_type: string
	): Promise<RestApi.ObjectResInterface> {
		try {
			const result = await ClassesModel.update(
				{
					school_id,
					major,
					major_type,
					class_level_id,
					count,
					name
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
