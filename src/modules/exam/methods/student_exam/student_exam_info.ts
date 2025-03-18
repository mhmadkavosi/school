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

	async calculate_student_exam_progress(student_id: string): Promise<RestApi.ObjectResInterface> {
		try {
			// Get all exams for this student, ordered by date
			const studentExams = await StudentExamModel.findAll({
				where: {
					student_id,
					points: {
						[Op.gt]: 0 // Only include checked exams (with points)
					}
				},
				include: [
					{
						model: ExamModel, // Assuming you have an ExamModel related to StudentExamModel
						attributes: ['date'],

						order: [
							['date', 'ASC'] // Order by exam date ascending
						]
					}
				]
			});

			// If there are less than 2 exams, we can't calculate progress
			if (studentExams.length < 2) {
				return {
					is_success: true,
					data: {
						progress: 0,
						message: 'Not enough exams to calculate progress'
					}
				};
			}

			// Extract points from all exams
			const examPoints = studentExams.map((exam: any) => exam.points);

			// Calculate average of all exams except the last one (X)
			const allExamsExceptLast = examPoints.slice(0, -1);
			const sumExceptLast = allExamsExceptLast.reduce((sum, points) => sum + points, 0);
			const X = sumExceptLast / allExamsExceptLast.length;

			// Calculate average of all exams including the last one (Y)
			const sumAll = examPoints.reduce((sum, points) => sum + points, 0);
			const Y = sumAll / examPoints.length;

			// Calculate difference and progress
			const difference = X - Y;

			// Avoid division by zero
			if (X === 0) {
				return {
					is_success: true,
					data: {
						progress: 0,
						message: 'Cannot calculate progress (division by zero)'
					}
				};
			}

			const ratio = difference / X;
			const progress = ratio * 100;

			// averageExceptLast: X,
			//averageAll: Y,
			//difference: difference,
			//ratio: ratio,
			//examCount: examPoints.length,
			//lastExamPoints: examPoints[examPoints.length - 1]
			// Return the calculated progress
			return {
				is_success: true,
				data: {
					progress: progress
				}
			};
		} catch (error) {
			AppLogger.error('Error in calculateStudentExamProgress', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}

	async get_count_active_exam(student_id: string): Promise<RestApi.ObjectResInterface> {
		try {
			const result = await StudentExamModel.count({
				where: {
					student_id,
					points: {
						[Op.gt]: 0 // Only include checked exams (with points)
					}
				}
			});

			return {
				is_success: !!result,
				data: result
			};
		} catch (error) {
			AppLogger.error('Error in get_count_active_exam', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}
}
