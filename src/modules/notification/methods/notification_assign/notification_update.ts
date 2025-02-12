import { AppLogger } from '../../../../lib/logger/Logger';
import NotificationModel from '../../models/notification.model';

export class NotificationUpdate {
	async update(
		id: string,
		title: string,
		status: string,
		type: string,
		details: string
	): Promise<RestApi.ObjectResInterface> {
		try {
			const result = await NotificationModel.update(
				{
					title,
					status,
					type,
					details
				},
				{
					where: { id }
				}
			);

			return {
				is_success: result[0] > 0
			};
		} catch (error) {
			AppLogger.error('Error in NotificationUpdate update', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}
}
