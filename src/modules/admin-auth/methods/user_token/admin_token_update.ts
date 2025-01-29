import { AppLogger } from '../../../../lib/logger/Logger';
import AdminTokenModel from '../../models/admin_token.model';

export class AdminTokenUpdate {
	/**
	 * Update the last activity of an admin token by ID
	 * @returns ObjectResInterface
	 * @param token_id
	 */
	async update_last_activity_by_token_id(token_id: string): Promise<RestApi.ObjectResInterface> {
		try {
			const [update] = await AdminTokenModel.update(
				{ last_activity: new Date() },
				{ where: { token_id: token_id } }
			);

			return {
				is_success: update > 0
			};
		} catch (error) {
			AppLogger.error('Error in AdminTokenUpdate update_last_activity_by_token_id', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}
}
