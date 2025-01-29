import { AppLogger } from '../../../../lib/logger/Logger';
import AdminTokenModel from '../../models/admin_token.model';
import { Op } from 'sequelize';

export class AdminTokenInfo {
	/**
	 * Get admin token by admin ID and token ID
	 * @param admin_id The ID of the admin
	 * @param token_id The ID of the token
	 * @returns ObjectResInterface
	 */
	async get_admin_token_by_admin_id_and_token_id(
		admin_id: string,
		token_id: string
	): Promise<RestApi.ObjectResInterface> {
		try {
			const result = await AdminTokenModel.findOne({
				where: {
					[Op.and]: [
						{
							admin_id: admin_id
						},
						{
							token_id: token_id
						},
						{
							expire_at: {
								[Op.gte]: new Date()
							}
						}
					]
				}
			});

			return {
				is_success: true,
				data: result
			};
		} catch (error) {
			AppLogger.error('Error in AdminTokenInfo get_admin_token_by_admin_id_and_token_id', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}

	/**
	 * Get all admin tokens by admin ID except the specified token ID
	 * @param admin_id The ID of the admin
	 * @param token_id The ID of the token to exclude
	 * @returns ObjectResInterface
	 */
	async get_all_admin_token_by_user_id(
		admin_id: string,
		token_id: string
	): Promise<RestApi.ObjectResInterface> {
		try {
			const result = await AdminTokenModel.findAll({
				where: {
					admin_id: admin_id,
					[Op.and]: [
						{
							expire_at: {
								[Op.gte]: new Date()
							}
						},
						{
							token_id: {
								[Op.ne]: token_id
							}
						}
					]
				}
			});

			return {
				is_success: true,
				data: result
			};
		} catch (error) {
			AppLogger.error('Error in AdminTokenInfo get_all_admin_token_by_user_id', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}
}
