import { AppLogger } from '../../../../lib/logger/Logger';
import { Op } from 'sequelize';
import StudentTokenModel from '../../models/student_token.model';

export class StudentTokenInfo {
	/**
	 * Get admin token by admin ID and token ID
	 * @param student_id The ID of the admin
	 * @param token_id The ID of the token
	 * @returns ObjectResInterface
	 */
	async get_student_token_by_student_and_token_id(
		student_id: string,
		token_id: string
	): Promise<RestApi.ObjectResInterface> {
		try {
			const result = await StudentTokenModel.findOne({
				where: {
					[Op.and]: [
						{
							student_id: student_id
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
			AppLogger.error('Error in StudentTokenInfo get_student_token_by_student_and_token_id', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}

	/**
	 * Get all admin tokens by admin ID except the specified token ID
	 * @param student The ID of the admin
	 * @param token_id The ID of the token to exclude
	 * @returns ObjectResInterface
	 */
	async get_all_student_token_by_user_id(
		student_id: string,
		token_id: string
	): Promise<RestApi.ObjectResInterface> {
		try {
			const result = await StudentTokenModel.findAll({
				where: {
					student_id: student_id,
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
			AppLogger.error('Error in StudentTokenInfo get_all_student_token_by_user_id', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}
}
