import { AppLogger } from '../../../../lib/logger/Logger';
import ScheduleAssignModel from '../../models/schedule_assign.model';

export class ScheduleAssignCreate {
	async create(
		assign_to: string,
		assign_to_target: string,
		schedule_id: string
	): Promise<RestApi.ObjectResInterface> {
		try {
			const result = await ScheduleAssignModel.create(
				{ assign_to, assign_to_target, schedule_id },
				{ isNewRecord: true }
			);

			return {
				is_success: !!result,
				data: result
			};
		} catch (error) {
			AppLogger.error('Error in ScheduleAssignCreate create', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}
}
