import { AppLogger } from '../../../../lib/logger/Logger';
import AttendanceModel from '../../models/attendance.model';

export class AttendanceUpdate {
	async add_reason(id: string, attendance_reason_id: string): Promise<RestApi.ObjectResInterface> {
		try {
			const result = await AttendanceModel.update({ attendance_reason_id }, { where: { id } });

			return {
				is_success: result[0] > 0
			};
		} catch (error) {
			AppLogger.error('Error in AttendanceUpdate add_reason', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}

	async add_delay_time(id: string, time_of_delayed: number): Promise<RestApi.ObjectResInterface> {
		try {
			const result = await AttendanceModel.update({ time_of_delayed }, { where: { id } });

			return {
				is_success: result[0] > 0
			};
		} catch (error) {
			AppLogger.error('Error in AttendanceUpdate add_delay_time', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}

	async update_attendance_type(id: string, attendance_type: string): Promise<RestApi.ObjectResInterface> {
		try {
			const result = await AttendanceModel.update({ attendance_type }, { where: { id } });

			return {
				is_success: result[0] > 0
			};
		} catch (error) {
			AppLogger.error('Error in AttendanceUpdate update_attendance_type', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}
}
