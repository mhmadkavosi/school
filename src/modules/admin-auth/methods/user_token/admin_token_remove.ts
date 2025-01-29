import { AppLogger } from '../../../../lib/logger/Logger';
import AdminTokenModel from '../../models/admin_token.model';

export class AdminTokenRemove {
	/**
	 * Remove an admin token by admin ID and token ID
	 * @param token_id The id of the token to be removed
	 * @param admin_id The id of the admin
	 * @returns ObjectResInterface
	 */
	async remove_admin_token_by_admin_id_and_token_id(
		token_id: string,
		admin_id: string
	): Promise<RestApi.ObjectResInterface> {
		try {
			const result = await AdminTokenModel.destroy({ where: { admin_id: admin_id, token_id: token_id } });

			return {
				is_success: result > 0
			};
		} catch (error) {
			AppLogger.error('Error in AdminTokenRemove remove_admin_token_by_admin_id_and_token_id', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}

	/**
	 * Remove all tokens for an admin by admin ID
	 * @param admin_id The ID of the admin
	 * @returns ObjectResInterface
	 */
	async remove_all_tokens_by_user_id(admin_id: string): Promise<RestApi.ObjectResInterface> {
		try {
			const result = await AdminTokenModel.destroy({ where: { admin_id: admin_id } });

			return {
				is_success: !!result
			};
		} catch (error) {
			AppLogger.error('Error in AdminTokenRemove remove_user_token_by_user_id_and_token_id', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}
}
