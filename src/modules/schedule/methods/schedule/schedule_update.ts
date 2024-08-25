import { AppLogger } from '../../../../lib/logger/Logger';
import ScheduleModel from '../../models/schedule.model';

export class ScheduleUpdate {
	async update(
		schedule_id: string,
		title: string,
		event_date: Date,
		event_start_hour: string,
		event_end_hour: string,
		event_description: string,
		event_category_id: string,
		event_type: string
	): Promise<RestApi.ObjectResInterface> {
		try {
			const result = await ScheduleModel.update(
				{
					title,
					event_date,
					event_start_hour,
					event_end_hour,
					event_description,
					event_category_id,
					event_type
				},
				{
					where: {
						id: schedule_id
					}
				}
			);

			return {
				is_success: result[0] > 0
			};
		} catch (error) {
			AppLogger.error('Error in ScheduleUpdate create', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}
}
