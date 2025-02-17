import { AppLogger } from '../../../lib/logger/Logger';
import { AdminLogModel } from '../models/admin_logs.model';
import { StudentLogModel } from '../models/student_logs.model';
import { TeacherLogModel } from '../models/teacher_logs.model';

export class LogsInfo {
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
	async get_all(
		userType: string,
		page: number,
		limit: number,
		type: string,
		start_date: string,
		end_date: string,
		user_id: string
	): Promise<RestApi.ObjectResInterface> {
		try {
			const LogModel = this.getModelForUserType(userType);

			let match: any = { user_id };

			if (!!type) {
				match = { ...match, type };
			}
			let date_match: any = {};

			if (!!start_date && !!end_date) {
				date_match = {
					$and: [
						{
							created_at: {
								$gte: new Date(start_date + 'T' + '00:00:00' + '.000Z')
							}
						},
						{
							created_at: {
								$lte: new Date(end_date + 'T' + '23:59:00' + '.000Z')
							}
						}
					]
				};
			} else if (!!start_date) {
				date_match = {
					$and: [
						{
							created_at: {
								$gte: new Date(start_date + 'T' + '00:00:00' + '.000Z')
							}
						}
					]
				};
			} else if (!!end_date) {
				date_match = {
					$and: [
						{
							created_at: {
								$lte: new Date(end_date + 'T' + '23:59:00' + '.000Z')
							}
						}
					]
				};
			}

			const skip = (page - 1) * limit;

			const logs = await LogModel.aggregate([
				{
					$match: { ...match }
				},
				{ $match: { ...date_match } },
				{
					$project: {
						_id: 1,
						title: 1,
						user_id: 1,
						type: 1,
						ip: 1,
						device: 1,
						created_at: 1,
						updated_at: 1
					}
				},
				{
					$facet: {
						pagination: [
							{ $count: 'total_row' },
							{ $addFields: { current_page: page } },
							{ $addFields: { limit: limit } },
							{ $addFields: { total_page: { $ceil: { $divide: ['$total_row', limit] } } } }
						],
						logs: [{ $skip: skip }, { $limit: limit }]
					}
				},
				{
					$unwind: '$pagination'
				},
				{
					$sort: { created_at: 1 }
				}
			]);

			return {
				is_success: true,
				data: logs[0]
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
