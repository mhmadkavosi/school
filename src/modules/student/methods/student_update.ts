import { AppLogger } from '../../../lib/logger/Logger';
import StudentModel from '../models/student.model';

export class StudentUpdate {
	async update(
		id: string,
		class_id: string,
		name: string,
		family: string,
		email: string,
		phone: string,
		national_code: string,
		student_status: string,
		birth_date: Date,
		middle_name: string
	): Promise<RestApi.ObjectResInterface> {
		try {
			const result = await StudentModel.update(
				{
					class_id,
					name,
					family,
					email,
					phone,
					national_code,
					student_status,
					birth_date,
					middle_name
				},
				{
					where: {
						id
					}
				}
			);

			return {
				is_success: result[0] > 0
			};
		} catch (error) {
			AppLogger.error('Error in StudentUpdate update', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}

	async update_profile_picture(id: string, profile_picture: string): Promise<RestApi.ObjectResInterface> {
		try {
			const result = await StudentModel.update({ profile_picture }, { where: { id } });

			return {
				is_success: result[0] > 0
			};
		} catch (error) {
			AppLogger.error('Error in StudentUpdate update_profile_picture', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}

	async delete_profile_picture(id: string): Promise<RestApi.ObjectResInterface> {
		try {
			const result = await StudentModel.update({ profile_picture: null }, { where: { id } });

			return {
				is_success: result[0] > 0
			};
		} catch (error) {
			AppLogger.error('Error in StudentUpdate delete_profile_picture', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}
}
