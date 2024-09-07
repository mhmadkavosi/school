import { AppLogger } from '../../../../lib/logger/Logger';
import ClassTimingModel from '../../models/class_timing.mode';
import { WeekDays } from '../../models/enums/week_days.enum';

export class ClassTimingUpdate {
	async update(
		id: string,
		day: WeekDays,
		start_hour: string,
		end_hour: string
	): Promise<RestApi.ObjectResInterface> {
		try {
			const result = await ClassTimingModel.update(
				{ day, start_hour, end_hour },
				{
					where: { id }
				}
			);

			return {
				is_success: result[0] > 0
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
