import { AdminTokenBuilder } from './admin_token.builder';
import AdminTokenModel from '../../models/admin_token.model';
import { AppLogger } from '../../../../lib/logger/Logger';

export class AdminTokenCreate {
	/**
	 * Store the admin token in the database
	 * @param builder The AdminTokenBuilder instance
	 * @returns Promise<RestApi.ObjectResInterface>
	 */
	async save(builder: AdminTokenBuilder): Promise<RestApi.ObjectResInterface> {
		try {
			const create = await AdminTokenModel.create({
				admin_id: builder.getAdminId(),
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
			AppLogger.error('Error in AdminTokenCreate store', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}
}
