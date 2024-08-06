import { TeacherTokenBuilder } from './teacher_token.builder';
import TeacherTokenModel from '../../models/teacher_token.model';
import { AppLogger } from '../../../../lib/logger/Logger';

export class TeacherTokenCreate {
	/**
	 * Store the Teacher token in the database
	 * @param builder The TeacherTokenBuilder instance
	 * @returns Promise<RestApi.ObjectResInterface>
	 */
	async save(builder: TeacherTokenBuilder): Promise<RestApi.ObjectResInterface> {
		try {
			const create = await TeacherTokenModel.create({
				teacher_id: builder.getTeacherId(),
				ip: builder.getIp(),
				platform: builder.getPlatform(),
				device_name: builder.getDeviceName(),
				os: builder.getOs(),
				user_agent: builder.getUserAgent(),
				token_id: builder.getTokenId(),
				last_activity: builder.getLastActivity(),
				expire_at: builder.getExpireAt(),
				api_version: builder.getApiVersion()
			});

			return {
				is_success: !!create,
				data: create
			};
		} catch (error) {
			AppLogger.error('Error in TeacherTokenCreate store', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}
}
