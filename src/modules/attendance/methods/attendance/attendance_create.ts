import { AppLogger } from '../../../../lib/logger/Logger';
import AttendanceModel from '../../models/attendance.model';
import { AttendanceBuilder } from './attendance.builder';

export class AttendanceCreate {
	async create(builder: AttendanceBuilder): Promise<RestApi.ObjectResInterface> {
		try {
			const result = await AttendanceModel.create(
				{
					date: builder.getDate(),
					student_id: builder.getStudentId(),
					class_id: builder.getClassId(),
					attendance_reason_id: builder.getAttendanceReasonId(),
					attendance_type: builder.getAttendanceType(),
					time_of_delayed: builder.getTimeOfDelayed()
				},
				{
					isNewRecord: true
				}
			);

			return { is_success: !!result, data: result };
		} catch (error) {
			AppLogger.error('Error in AttendanceCreate create', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}
}
