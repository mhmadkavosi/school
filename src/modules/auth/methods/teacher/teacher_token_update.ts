import { AppLogger } from '../../../../lib/logger/Logger';
import TeacherTokenModel from '../../models/teacher_token.model';

export class TeacherTokenUpdate {
	/**
	 * Update the last activity of an Teacher token by ID
	 * @returns ObjectResInterface
	 * @param token_id
	 */
	async update_last_activity_by_token_id(token_id: string): Promise<RestApi.ObjectResInterface> {
		try {
			const [update] = await TeacherTokenModel.update(
				{ last_activity: new Date() },
				{ where: { token_id: token_id } }
			);

			return {
				is_success: update > 0
			};
		} catch (error) {
			AppLogger.error('Error in TeacherTokenUpdate update_last_activity_by_token_id', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}
}
