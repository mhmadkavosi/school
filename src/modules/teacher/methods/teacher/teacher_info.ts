import { AppLogger } from '../../../../lib/logger/Logger';
import TeacherModel from '../../models/teacher.model';

export class TeacherInfo {
	async get_by_email(email: string): Promise<RestApi.ObjectResInterface> {
		try {
			const result = await TeacherModel.findOne({ where: { email } });

			return {
				is_success: !!result,
				data: result
			};
		} catch (error) {
			AppLogger.error('Error in TeacherInfo get_by_email', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}

	async get_by_phone_number(phone_number: string): Promise<RestApi.ObjectResInterface> {
		try {
			const result = await TeacherModel.findOne({ where: { phone_number } });

			return {
				is_success: !!result,
				data: result
			};
		} catch (error) {
			AppLogger.error('Error in TeacherInfo get_by_phone_number', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}

	async get_by_id(id: string): Promise<RestApi.ObjectResInterface> {
		try {
			const result = await TeacherModel.findOne({ where: { id } });

			return {
				is_success: !!result,
				data: result
			};
		} catch (error) {
			AppLogger.error('Error in TeacherInfo get_by_id', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}
}
