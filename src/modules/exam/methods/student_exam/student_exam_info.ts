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

	async get_avg_student(student_id: string): Promise<RestApi.ObjectResInterface> {
		try {
			const result = await StudentExamModel.findAll({
				attributes: [[Sequelize.fn('AVG', Sequelize.col('points')), 'average_score']],
				where: {
					student_id: student_id
				}
			});

			return {
				is_success: !!result,
				data: result
			};
		} catch (error) {
			AppLogger.error('Error in StudentExamInfo get_avg_student', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}

	async get_avg_class(class_id: string): Promise<RestApi.ObjectResInterface> {
		try {
			const result = await StudentExamModel.findAll({
				attributes: [[Sequelize.fn('AVG', Sequelize.col('points')), 'average_score']],
				where: {
					class_id: class_id
				}
			});

			return {
				is_success: !!result,
				data: result
			};
		} catch (error) {
			AppLogger.error('Error in StudentExamInfo get_avg_class', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}
}
