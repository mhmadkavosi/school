import { AppLogger } from '../../../../lib/logger/Logger';
import NotificationModel from '../../models/notification.model';
import { NotificationBuilder } from './notification.builder';

export class NotificationCreate {
	async create(builder: NotificationBuilder): Promise<RestApi.ObjectResInterface> {
		try {
			const result = await NotificationModel.create(
				{
					title: builder.getTitle(),
					status: builder.getStatus(),
					type: builder.getType(),
					details: builder.getDetails()
				},
				{ isNewRecord: true }
			);

			return {
				is_success: !!result,
				data: result
			};
		} catch (error) {
			AppLogger.error('Error in NotificationCreate create', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}
}
