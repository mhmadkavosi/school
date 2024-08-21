import { AppLogger } from '../../../../lib/logger/Logger';
import ScheduleAssignModel from '../../models/schedule_assign.model';

export class ScheduleAssignDestroy {
	async delete(assign_to: string, schedule_id: string): Promise<RestApi.ObjectResInterface> {
		try {
			await ScheduleAssignModel.destroy({ where: { assign_to, schedule_id } });

			return {
				is_success: true
			};
		} catch (error) {
			AppLogger.error('Error in ScheduleAssignDestroy delete', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}

	async delete_schedule_id(schedule_id: string): Promise<RestApi.ObjectResInterface> {
		try {
			await ScheduleAssignModel.destroy({ where: { schedule_id } });

			return {
				is_success: true
			};
		} catch (error) {
			AppLogger.error('Error in ScheduleAssignDestroy delete', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}
}
