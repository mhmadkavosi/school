import { AppLogger } from '../../../../lib/logger/Logger';
import TeacherTokenModel from '../../models/teacher_token.model';

export class TeacherTokenRemove {
	/**
	 * Remove an Teacher token by Teacher ID and token ID
	 * @param token_id The id of the token to be removed
	 * @param teacher_id The id of the Teacher
	 * @returns ObjectResInterface
	 */
	async remove_teacher_token_by_teacher_id_and_token_id(
		token_id: string,
		teacher_id: string
	): Promise<RestApi.ObjectResInterface> {
		try {
			const result = await TeacherTokenModel.destroy({
				where: { teacher_id: teacher_id, token_id: token_id }
			});

			return {
				is_success: result > 0
			};
		} catch (error) {
			AppLogger.error('Error in TeacherTokenRemove remove_Teacher_token_by_teacher_id_and_token_id', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}

	/**
	 * Remove all tokens for an Teacher by Teacher ID
	 * @param teacher_id The ID of the Teacher
	 * @returns ObjectResInterface
	 */
	async remove_all_tokens_by_user_id(teacher_id: string): Promise<RestApi.ObjectResInterface> {
		try {
			const result = await TeacherTokenModel.destroy({ where: { teacher_id: teacher_id } });

			return {
				is_success: !!result
			};
		} catch (error) {
			AppLogger.error('Error in TeacherTokenRemove remove_user_token_by_user_id_and_token_id', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}
}
