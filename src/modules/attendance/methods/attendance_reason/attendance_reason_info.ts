import { AppLogger } from '../../../../lib/logger/Logger';
import AttendanceReasonModel from '../../models/attendance_reason.model';

export class AttendanceReasonInfo {
	async get_all(): Promise<RestApi.ObjectResInterface> {
		try {
			const result = await AttendanceReasonModel.findAll({ where: { is_active: true } });

			return {
				is_success: true,
				data: result
			};
		} catch (error) {
			AppLogger.error('Error in AttendanceReasonInfo get_all', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}

	async get_info_by_id(id: string): Promise<RestApi.ObjectResInterface> {
		try {
			const result = await AttendanceReasonModel.findOne({ where: { id } });

			return {
				is_success: !!result,
				data: result
			};
		} catch (error) {
			AppLogger.error('Error in AttendanceReasonInfo get_info_by_id', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}
}
