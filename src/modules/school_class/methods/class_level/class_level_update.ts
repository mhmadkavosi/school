import { AppLogger } from '../../../../lib/logger/Logger';
import ClassLevelModel from '../../models/class_level.model';

export class ClassLevelUpdate {
	async update(
		id: string,
		name: string,
		section_id: string,
		level: string,
		is_active: boolean
	): Promise<RestApi.ObjectResInterface> {
		try {
			const result = await ClassLevelModel.update({ name, section_id, level, is_active }, { where: { id } });

			return {
				is_success: result[0] > 0
			};
		} catch (error) {
			AppLogger.error('Error in ClassLevelUpdate update', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}
}
