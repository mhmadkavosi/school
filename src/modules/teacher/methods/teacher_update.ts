import { AppLogger } from '../../../lib/logger/Logger';
import TeacherModel from '../models/teacher.model';

export class TeacherUpdate {
	async add_password(id: string, password: string): Promise<RestApi.ObjectResInterface> {
		try {
			const result = await TeacherModel.update({ password }, { where: { id } });

			return {
				is_success: result[0] > 0
			};
		} catch (error) {
			AppLogger.error('Error in TeacherUpdate add_password', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}

	async update_phone_number(id: string, phone_number: string): Promise<RestApi.ObjectResInterface> {
		try {
			const result = await TeacherModel.update({ phone_number }, { where: { id } });

			return {
				is_success: result[0] > 0
			};
		} catch (error) {
			AppLogger.error('Error in TeacherUpdate update_phone_number', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}

	async update_email(id: string, email: string): Promise<RestApi.ObjectResInterface> {
		try {
			const result = await TeacherModel.update({ email }, { where: { id } });

			return {
				is_success: result[0] > 0
			};
		} catch (error) {
			AppLogger.error('Error in TeacherUpdate update_email', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}

	async update_profile_picture(id: string, profile_picture: string): Promise<RestApi.ObjectResInterface> {
		try {
			const result = await TeacherModel.update({ profile_picture }, { where: { id } });

			return {
				is_success: result[0] > 0
			};
		} catch (error) {
			AppLogger.error('Error in TeacherUpdate update_profile_picture', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}

	async update_details(
		id: string,
		name: string,
		family: string,
		major_id: string,
		about: string,
		school_id: string
	): Promise<RestApi.ObjectResInterface> {
		try {
			const result = await TeacherModel.update(
				{
					name,
					family,
					major_id,
					about,
					school_id
				},
				{ where: { id } }
			);

			return {
				is_success: result[0] > 0
			};
		} catch (error) {
			AppLogger.error('Error in TeacherUpdate update_details', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}
}
