import { AppLogger } from '../../../lib/logger/Logger';
import StudentModel from '../models/student.model';
import { StudentBuilder } from './student.builder';

export class StudentCreate {
	async create(builder: StudentBuilder): Promise<RestApi.ObjectResInterface> {
		try {
			const result = await StudentModel.create(
				{
					name: builder.getName(),
					family: builder.getFamily(),
					email: builder.getEmail(),
					phone: builder.getPhone(),
					national_code: builder.getNationalCode(),
					student_status: builder.getStudentStatus(),
					birth_date: builder.getBirthDate(),
					password: builder.getPassword(),
					profile_picture: builder.getProfilePicture(),
					middle_name: builder.getMiddleName(),
					school_id: builder.getSchoolId()
				},
				{ isNewRecord: true }
			);

			return {
				is_success: !!result,
				data: result
			};
		} catch (error) {
			AppLogger.error('Error in StudentCreate create', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}
}
