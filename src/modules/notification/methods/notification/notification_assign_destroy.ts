import { AppLogger } from '../../../../lib/logger/Logger';
import NotificationAssignModel from '../../models/notification_assign.model';

export class NotificationAssignDestroy {
	async destroy(id: string): Promise<RestApi.ObjectResInterface> {
		try {
			const result = await NotificationAssignModel.destroy({
				where: { id }
			});

			return {
				is_success: result > 0,
				data: { deleted: result > 0 }
			};
		} catch (error) {
			AppLogger.error('Error in NotificationAssignDestroy destroy', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}
}
