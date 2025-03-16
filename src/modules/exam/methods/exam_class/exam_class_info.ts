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
		end_date: string,
		student_id: string,
		sort: string
	): Promise<RestApi.ObjectResInterface> {
		try {
			const skip = (page - 1) * limit;
			const match: any = [{ teacher_id }];

			let sort_value = '';
			if (sort === 'last_exam') {
				sort_value = 'DESC';
			} else if (sort === 'first_exam') {
				sort_value = 'ASC';
			}
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
			const exam_class_match: any = [];

			if (!!class_id) {
				exam_class_match.push({
					class_id
				});
			}

			const student_match: any = [];

			if (!!student_id) {
				student_match.push({
					student_id
				});
			}

			const result = await ExamClassModel.findAndCountAll({
				where: { [Op.and]: exam_class_match },
				include: [
					{
						model: ExamModel,
						where: { [Op.and]: match },
						order: ['created_at', sort_value],
						include: [
							{
								model: StudentExamModel,
								where: {
									[Op.and]: student_match
								}
							}
						]
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

	async get_list_of_students(exam_id: string): Promise<RestApi.ObjectResInterface> {
		try {
			const result = await ExamClassModel.findAll({
				where: { exam_id },
				include: [
					{
						model: ExamModel,
						include: [
							{
								model: StudentExamModel,
								include: [
									{
										model: StudentModel,
										attributes: ['name', 'family', 'middle_name', 'profile_picture', 'id']
									}
								]
							}
						]
					}
				]
			});

			return {
				is_success: !!result,
				data: result[0]
			};
		} catch (error) {
			AppLogger.error('Error in ExamClassInfo get_all', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}
}
