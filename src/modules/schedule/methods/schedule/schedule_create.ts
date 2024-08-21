import { AppLogger } from '../../../../lib/logger/Logger';
import ScheduleModel from '../../models/schedule.model';
import { ScheduleBuilder } from './schedule.builder';

export class ScheduleCreate {
	async create(builder: ScheduleBuilder): Promise<RestApi.ObjectResInterface> {
		try {
			const result = await ScheduleModel.create({
				title: builder.getTitle(),
				event_date: builder.getEventDate(),
				event_start_hour: builder.getEventStartHour(),
				event_end_hour: builder.getEventEndHour(),
				event_description: builder.getEventDescription(),
				event_category_id: builder.getEventCategoryId(),
				event_type: builder.getEventType(),
				school_id: builder.getSchoolId(),
				teacher_id: builder.getTeacherId()
			});

			return {
				is_success: !!result,
				data: result
			};
		} catch (error) {
			AppLogger.error('Error in ScheduleCreate create', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}
}
