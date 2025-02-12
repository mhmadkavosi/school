import { AppLogger } from '../../../../lib/logger/Logger';
import NotificationAssignModel from '../../models/notification_assign.model';

export class NotificationAssignCreate {
	async create(
		notification_id: string,
		assign_id: string,
		assign_type: string
	): Promise<RestApi.ObjectResInterface> {
		try {
			const result = await NotificationAssignModel.create(
				{
					notification_id,
					assign_id,
					assign_type
				},
				{ isNewRecord: true }
			);

			return {
				is_success: !!result,
				data: result
			};
		} catch (error) {
			AppLogger.error('Error in NotificationAssignCreate create', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}
}
