import { Op, Sequelize } from 'sequelize';
import StudentExamModel from '../../models/student_exam.model';
import { AppLogger } from '../../../../lib/logger/Logger';
import ExamModel from '../../models/exam.model';

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

	async get_avg_all(teacher_id: string): Promise<RestApi.ObjectResInterface> {
		try {
			const result = await StudentExamModel.findAll({
				attributes: ['class_id', [Sequelize.fn('AVG', Sequelize.col('points')), 'average_points']],
				include: [
					{
						model: ExamModel,
						attributes: [],
						where: { teacher_id: teacher_id }
					}
				],
				group: 'class_id'
			});

			return {
				is_success: !!result,
				data: result
			};
		} catch (error) {
			AppLogger.error('Error in StudentExamInfo get_avg_all', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}

	async get_exam_check_counts(exam_id: string): Promise<RestApi.ObjectResInterface> {
		try {
			// Build the where clause based on provided filters
			const whereClause: any = {};

			if (exam_id) {
				whereClause.exam_id = exam_id;
			}

			// Get total count
			const totalCount = await StudentExamModel.count({
				where: whereClause
			});

			// Get checked count (points > 0)
			const checkedCount = await StudentExamModel.count({
				where: {
					...whereClause,
					points: {
						[Op.gt]: 0
					}
				}
			});

			// Calculate unchecked count
			const uncheckedCount = totalCount - checkedCount;

			return {
				is_success: true,
				data: {
					total: totalCount,
					checked: checkedCount,
					unchecked: uncheckedCount
				}
			};
		} catch (error) {
			AppLogger.error('Error in getExamCheckCounts', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}
}
