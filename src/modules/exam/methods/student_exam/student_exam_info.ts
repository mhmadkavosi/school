import { Sequelize } from 'sequelize';
import StudentExamModel from '../../models/student_exam.model';
import { AppLogger } from '../../../../lib/logger/Logger';

export class StudentExamInfo {
	async get_avg_exam(exam_id: string): Promise<RestApi.ObjectResInterface> {
		try {
			const result = await StudentExamModel.findAll({
				attributes: [[Sequelize.fn('AVG', Sequelize.col('points')), 'average_score']],
				where: {
					exam_id: exam_id
				}
			});

			return {
				is_success: !!result,
				data: result
			};
		} catch (error) {
			AppLogger.error('Error in StudentExamInfo get_avg_exam', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}
}
