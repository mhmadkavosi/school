import { AppLogger } from '../../../../lib/logger/Logger';
import ClassLevelModel from '../../models/class_level.model';

export class ClassLevelCreate {
	async create(name: string, section_id: string, level: string): Promise<RestApi.ObjectResInterface> {
		try {
			const result = await ClassLevelModel.create({ name, section_id, level }, { isNewRecord: true });

			return {
				is_success: !!result,
				data: result
			};
		} catch (error) {
			AppLogger.error('Error in ClassLevelCreate create', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}
}
