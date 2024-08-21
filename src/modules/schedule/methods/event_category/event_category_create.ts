import { AppLogger } from '../../../../lib/logger/Logger';
import EventCategoryModel from '../../models/event_category.model';

export class EventCategoryCreate {
	async create(name: string): Promise<RestApi.ObjectResInterface> {
		try {
			const result = await EventCategoryModel.create({ name }, { isNewRecord: true });

			return {
				is_success: !!result,
				data: result
			};
		} catch (error) {
			AppLogger.error('Error in EventCategoryCreate create', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}
}
