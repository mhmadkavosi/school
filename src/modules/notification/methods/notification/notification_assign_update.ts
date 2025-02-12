import { AppLogger } from '../../../../lib/logger/Logger';
import NotificationAssignModel from '../../models/notification_assign.model';

export class NotificationAssignUpdate {
	async update(
		id: string,
		notification_id: string,
		assign_id: string,
		assign_type: string
	): Promise<RestApi.ObjectResInterface> {
		try {
			const result = await NotificationAssignModel.update(
				{
					notification_id,
					assign_id,
					assign_type
				},
				{
					where: { id }
				}
			);

			return {
				is_success: result[0] > 0
			};
		} catch (error) {
			AppLogger.error('Error in NotificationAssignUpdate update', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}
}
