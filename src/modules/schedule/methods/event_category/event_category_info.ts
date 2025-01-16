import { AppLogger } from '../../../../lib/logger/Logger';
import EventCategoryModel from '../../models/event_category.model';

export class EventCategoryInfo {
	async get_all(): Promise<RestApi.ObjectResInterface> {
		try {
			const result = await EventCategoryModel.findAll({ where: { is_active: true } });

			return {
				is_success: true,
				data: result
			};
		} catch (error) {
			AppLogger.error('Error in EventCategoryInfo get_all', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}

	async get_info_by_id(id: string): Promise<RestApi.ObjectResInterface> {
		try {
			const result = await EventCategoryModel.findOne({ where: { id } });

			return {
				is_success: !!result,
				data: result
			};
		} catch (error) {
			AppLogger.error('Error in EventCategoryInfo get_info_by_id', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}
}
