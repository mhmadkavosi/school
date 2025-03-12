import { StudentTokenBuilder } from './student_token.builder';
import { AppLogger } from '../../../../lib/logger/Logger';
import StudentTokenModel from '../../models/student_token.model';

export class StudentTokenCreate {
	/**
	 * Store the student token in the database
	 * @param builder The StudentTokenBuilder instance
	 * @returns Promise<RestApi.ObjectResInterface>
	 */
	async save(builder: StudentTokenBuilder): Promise<RestApi.ObjectResInterface> {
		try {
			const create = await StudentTokenModel.create({
				student_id: builder.getStudentId(),
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
			AppLogger.error('Error in StudentTokenCreate store', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}
}
