import { AppLogger } from '../../../../lib/logger/Logger';
import AttendanceReasonModel from '../../models/attendance_reason.model';

export class AttendanceReasonCreate {
	async create(name: string): Promise<RestApi.ObjectResInterface> {
		try {
			const result = await AttendanceReasonModel.create({ name }, { isNewRecord: true });

			return {
				is_success: !!result,
				data: result
			};
		} catch (error) {
			AppLogger.error('Error in AttendanceReasonCreate create', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}
}
