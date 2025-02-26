import { AppLogger } from '../../../../lib/logger/Logger';
import AdminModel from '../../models/admin.model';

export class AdminUpdate {
	/**
	 *
	 * @param user_id
	 * @param name
	 * @param family
	 */
	async update_user_info(
		user_id: string,
		name: string,
		family: string,
		email: string,
		super_admin: boolean,
		about_me: string
	) {
		try {
			const [result] = await AdminModel.update(
				{
					name: name,
					family: family,
					email,
					super_admin,
					about_me
				},
				{ where: { id: user_id } }
			);

			return {
				is_success: result > 0,
				data: result
			};
		} catch (error) {
			AppLogger.error('Error in AdminUpdate update_user_info', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}

	/**
	 *
	 * @param admin_id
	 * @param is_active
	 */
	async update_is_active(admin_id: string, is_active: boolean): Promise<RestApi.ObjectResInterface> {
		try {
			const [result] = await AdminModel.update({ is_active: is_active }, { where: { id: admin_id } });

			return {
				is_success: result > 0,
				data: result
			};
		} catch (error) {
			AppLogger.error('Error in AdminUpdate update_is_active', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}

	/**
	 *
	 * @param admin_id
	 * @param password
	 */
	async update_password(admin_id: string, password: string): Promise<RestApi.ObjectResInterface> {
		try {
			const [result] = await AdminModel.update({ password: password }, { where: { id: admin_id } });

			return {
				is_success: result > 0,
				data: result
			};
		} catch (error) {
			AppLogger.error('Error in AdminUpdate update_password', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}

	async update_profile_picture(id: string, profile_picture: string): Promise<RestApi.ObjectResInterface> {
		try {
			const result = await AdminModel.update({ profile_picture }, { where: { id } });

			return {
				is_success: result[0] > 0
			};
		} catch (error) {
			AppLogger.error('Error in AdminUpdate update_profile_picture', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}

	async delete_profile_picture(id: string): Promise<RestApi.ObjectResInterface> {
		try {
			const result = await AdminModel.update({ profile_picture: null }, { where: { id } });

			return {
				is_success: result[0] > 0
			};
		} catch (error) {
			AppLogger.error('Error in AdminUpdate delete_profile_picture', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}
}
