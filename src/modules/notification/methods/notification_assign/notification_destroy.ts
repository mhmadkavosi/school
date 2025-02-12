import { AppLogger } from '../../../../lib/logger/Logger';
import NotificationModel from '../../models/notification.model';
import NotificationAssignModel from '../../models/notification_assign.model';

export class NotificationDestroy {
	async destroy(id: string): Promise<RestApi.ObjectResInterface> {
		try {
			// Delete associated assignments first
			await NotificationAssignModel.destroy({
				where: { notification_id: id }
			});

			// Delete the notification
			const result = await NotificationModel.destroy({
				where: { id }
			});

			return {
				is_success: result > 0,
				data: { deleted: result > 0 }
			};
		} catch (error) {
			AppLogger.error('Error in NotificationDestroy destroy', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}
}
