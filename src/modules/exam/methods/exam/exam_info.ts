import { Op } from 'sequelize';
import { AppLogger } from '../../../../lib/logger/Logger';
import ExamModel from '../../models/exam.model';

export class ExamInfo {
	async get_count_of_exam_of_date(
		start_date: string,
		end_date: string,
		teacher_id: string
	): Promise<RestApi.ObjectResInterface> {
		try {
			const match: any = [{ teacher_id }];

			if (start_date && end_date) {
				match.push({
					date: {
						[Op.gte]: new Date(start_date + 'T' + '00:00:00' + '.000Z'),
						[Op.lte]: new Date(end_date + 'T' + '23:59:00' + '.000Z')
					}
				});
			} else if (start_date) {
				match.push({
					date: {
						[Op.gte]: new Date(start_date + 'T' + '00:00:00' + '.000Z'),
						[Op.lte]: new Date(start_date + 'T' + '23:59:00' + '.000Z')
					}
				});
			} else if (end_date) {
				match.push({
					date: {
						[Op.gte]: new Date(end_date + 'T' + '00:00:00' + '.000Z'),
						[Op.lte]: new Date(end_date + 'T' + '23:59:00' + '.000Z')
					}
				});
			}

			const result = await ExamModel.count({
				where: { [Op.and]: match }
			});

			return {
				is_success: true,
				data: result
			};
		} catch (error) {
			AppLogger.error('Error in ExamClassInfo get_count_of_exam_of_date', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}
}
