import { Op } from 'sequelize';
import TeacherTokenModel from '../../models/teacher_token.model';
import { AppLogger } from '../../../../lib/logger/Logger';

export class TeacherTokenInfo {
	/**
	 * Get Teacher token by Teacher ID and token ID
	 * @param teacher_id The ID of the Teacher
	 * @param token_id The ID of the token
	 * @returns ObjectResInterface
	 */
	async get_Teacher_token_by_teacher_id_and_token_id(
		teacher_id: string,
		token_id: string
	): Promise<RestApi.ObjectResInterface> {
		try {
			const result = await TeacherTokenModel.findOne({
				where: {
					[Op.and]: [
						{
							teacher_id: teacher_id
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
			AppLogger.error('Error in TeacherTokenInfo get_Teacher_token_by_teacher_id_and_token_id', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}

	/**
	 * Get all Teacher tokens by Teacher ID except the specified token ID
	 * @param teacher_id The ID of the Teacher
	 * @param token_id The ID of the token to exclude
	 * @returns ObjectResInterface
	 */
	async get_all_Teacher_token_by_user_id(
		teacher_id: string,
		token_id: string
	): Promise<RestApi.ObjectResInterface> {
		try {
			const result = await TeacherTokenModel.findAll({
				where: {
					teacher_id: teacher_id,
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
			AppLogger.error('Error in TeacherTokenInfo get_all_Teacher_token_by_user_id', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}
}
