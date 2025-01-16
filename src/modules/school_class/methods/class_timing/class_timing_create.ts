import { AppLogger } from '../../../../lib/logger/Logger';
import ClassTimingModel from '../../models/class_timing.mode';
import { WeekDays } from '../../models/enums/week_days.enum';

export class ClassTimingCreate {
	async create(
		class_id: string,
		day: WeekDays,
		start_hour: string,
		end_hour: string
	): Promise<RestApi.ObjectResInterface> {
		try {
			const result = await ClassTimingModel.create(
				{ class_id, day, start_hour, end_hour },
				{ isNewRecord: true }
			);

			return {
				is_success: !!result,
				data: result
			};
		} catch (error) {
			AppLogger.error('Error in ClassTimingCreate create', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}
}
