import { Op } from 'sequelize';
import { AppLogger } from '../../../../lib/logger/Logger';
import ExamClassModel from '../../models/exam_class.mode';
import ExamModel from '../../models/exam.model';
import ClassesModel from '../../../school_class/models/classes.model';
import { paginate } from '../../../../utils/paginate.utility';
import StudentExamModel from '../../models/student_exam.model';
import StudentModel from '../../../student/models/student.model';

export class ExamClassInfo {
	async get_all(
		page: number,
		limit: number,
		class_id: string,
		teacher_id: string,
		start_date: string,
		end_date: string
	): Promise<RestApi.ObjectResInterface> {
		try {
			const skip = (page - 1) * limit;
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

			const result = await ExamClassModel.findAndCountAll({
				where: { class_id },
				include: [
					{
						model: ExamModel,
						where: { [Op.and]: match }
					},
					{ model: ClassesModel, attributes: ['id', 'name'] }
				],
				distinct: true,
				limit: limit,
				offset: skip
			});

			return {
				is_success: !!result,
				data: paginate(page, limit, result)
			};
		} catch (error) {
			AppLogger.error('Error in ExamClassInfo get_all', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}

	async get_info_by_id(exam_id: string, class_id: string): Promise<RestApi.ObjectResInterface> {
		try {
			const result = await ExamClassModel.findOne({
				where: {
					class_id,
					exam_id
				},
				include: [
					{
						model: ExamModel,
						include: [
							{
								model: StudentExamModel,
								attributes: ['id', 'points'],
								include: [
									{
										model: StudentModel,
										attributes: ['id', 'name', 'family']
									}
								]
							}
						]
					}
				]
			});

			return {
				is_success: !!result,
				data: result
			};
		} catch (error) {
			AppLogger.error('Error in ExamClassInfo get_info_by_id', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}
}
