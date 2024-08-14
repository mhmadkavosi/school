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
		profile_picture: string
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
					profile_picture
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
}
