import { AppLogger } from '../../../../lib/logger/Logger';
import StudentTokenModel from '../../models/student_token.model';

export class StudentTokenRemove {
	/**
	 * Remove an student token by student ID and token ID
	 * @param token_id The id of the token to be removed
	 * @param student_id The id of the student
	 * @returns ObjectResInterface
	 */
	async remove_student_token_by_student_id_and_token_id(
		token_id: string,
		student_id: string
	): Promise<RestApi.ObjectResInterface> {
		try {
			const result = await StudentTokenModel.destroy({
				where: { student_id: student_id, token_id: token_id }
			});

			return {
				is_success: result > 0
			};
		} catch (error) {
			AppLogger.error('Error in StudentTokenRemove remove_student_token_by_student_id_and_token_id', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}

	/**
	 * Remove all tokens for an student by student ID
	 * @param student_id The ID of the student
	 * @returns ObjectResInterface
	 */
	async remove_all_tokens_by_user_id(student_id: string): Promise<RestApi.ObjectResInterface> {
		try {
			const result = await StudentTokenModel.destroy({ where: { student_id: student_id } });

			return {
				is_success: !!result
			};
		} catch (error) {
			AppLogger.error('Error in StudentTokenRemove remove_user_token_by_user_id_and_token_id', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}
}
