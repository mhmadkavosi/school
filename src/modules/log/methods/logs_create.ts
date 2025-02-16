import { AppLogger } from '../../../lib/logger/Logger';
import { AdminLogModel } from '../models/admin_logs.model';
import { LogTypeEnum } from '../models/enums/log_type.eum';
import { StudentLogModel } from '../models/student_logs.model';
import { TeacherLogModel } from '../models/teacher_logs.model';

export class LogCreate {
	private getModelForUserType(userType: string) {
		switch (userType.toUpperCase()) {
			case 'ADMIN':
				return AdminLogModel;
			case 'TEACHER':
				return TeacherLogModel;
			case 'STUDENT':
				return StudentLogModel;
			default:
				throw new Error('Invalid user type');
		}
	}

	async createLog(
		userType: string,
		title: string,
		type: LogTypeEnum,
		ip: string,
		device: string,
		user_id: string
	): Promise<RestApi.ObjectResInterface> {
		try {
			const LogModel = this.getModelForUserType(userType);

			const result = await LogModel.create({
				title,
				type,
				ip,
				device,
				user_id
			});

			return {
				is_success: !!result,
				data: result
			};
		} catch (error) {
			AppLogger.error('Error in LogCreate createLog', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}
}
