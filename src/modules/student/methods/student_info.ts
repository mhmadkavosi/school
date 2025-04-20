import { Op } from 'sequelize';
import { AppLogger } from '../../../lib/logger/Logger';
import { paginate } from '../../../utils/paginate.utility';
import SchoolModel from '../../school/models/school.model';
import ClassesModel from '../../school_class/models/classes.model';
import StudentModel from '../models/student.model';
import ClassLevelModel from '../../school_class/models/class_level.model';
import ClassTimingModel from '../../school_class/models/class_timing.mode';
import MajorModel from '../../school_class/models/major.model';
import SectionModel from '../../school/models/section.model';
import StudentClassesModel from '../models/student_class.model';

export class StudentInfo {
	async get_all_student_of_class_with_pagination(
		page: number,
		limit: number,
		class_id: string,
		teacher_id: string
	): Promise<RestApi.ObjectResInterface> {
		try {
			const skip = (page - 1) * limit;

			const result = await StudentModel.findAndCountAll({
				distinct: true,
				limit: limit,
				offset: skip,
				include: [
					{
						model: StudentClassesModel,
						where: { class_id },
						include: [
							{
								model: ClassesModel,
								attributes: ['name', 'id', 'teacher_id'],
								where: { teacher_id }
							}
						]
					}
				],
				order: [['created_at', 'DESC']]
			});

			return {
				is_success: true,
				data: paginate(page, limit, result)
			};
		} catch (error) {
			AppLogger.error('Error in StudentInfo get_all_student_of_class_with_pagination', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}

	async get_all_student_of_class_with_search(
		page: number,
		limit: number,
		class_id: string,
		search: string
	): Promise<RestApi.ObjectResInterface> {
		try {
			const skip = (page - 1) * limit;
			const attributes = ['middle_name', 'name', 'family', 'email', 'phone', 'national_code'];
			let whereClause: any = {};

			if (!!search) {
				whereClause = {
					[Op.or]: attributes.map((attribute) => ({
						[attribute]: { [Op.like]: `%${search}%` }
					}))
				};
			}

			const result = await StudentModel.findAndCountAll({
				where: whereClause,
				include: [
					{
						model: StudentClassesModel,
						where: { class_id }
					}
				],
				distinct: true,
				limit: limit,
				offset: skip,
				order: [['created_at', 'DESC']]
			});

			return {
				is_success: true,
				data: paginate(page, limit, result)
			};
		} catch (error) {
			AppLogger.error('Error in StudentInfo get_all_student_of_class_with_search', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}

	async get_all_student_of_class(class_id: string): Promise<RestApi.ObjectResInterface> {
		try {
			const result = await StudentModel.findAll({
				include: [
					{
						model: StudentClassesModel,
						where: { class_id }
					}
				]
			});

			return {
				is_success: true,
				data: result
			};
		} catch (error) {
			AppLogger.error('Error in StudentInfo get_all_student_of_class', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}
	async get_all_student_of_class_paginate(
		page: number,
		limit: number,
		class_id: string
	): Promise<RestApi.ObjectResInterface> {
		try {
			const skip = (page - 1) * limit;

			const result = await StudentModel.findAndCountAll({
				include: [
					{
						model: StudentClassesModel,
						where: { class_id }
					}
				],
				distinct: true,
				limit: limit,
				offset: skip,
				attributes: ['id', 'profile_picture', 'phone', 'name', 'family', 'email', 'birth_date'],
				order: [['created_at', 'DESC']]
			});

			return {
				is_success: true,
				data: paginate(page, limit, result)
			};
		} catch (error) {
			AppLogger.error('Error in StudentInfo get_all_student_of_class_paginate', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}

	async get_all_student_by_school_id(
		page: number,
		limit: number,
		school_id: string
	): Promise<RestApi.ObjectResInterface> {
		try {
			const skip = (page - 1) * limit;

			const result = await SchoolModel.findAndCountAll({
				where: { id: school_id },
				distinct: true,
				limit: limit,
				offset: skip,
				order: [['created_at', 'DESC']],
				include: [
					{
						model: ClassesModel,
						as: 'classes',
						include: [
							{
								model: StudentClassesModel,
								include: [
									{
										model: StudentModel
									}
								]
							}
						]
					}
				]
			});

			return {
				is_success: true,
				data: paginate(page, limit, result)
			};
		} catch (error) {
			AppLogger.error('Error in StudentInfo get_all_student_by_school_id', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}

	async get_by_id(id: string): Promise<RestApi.ObjectResInterface> {
		try {
			const result = await StudentModel.findOne({ where: { id } });

			return {
				is_success: !!result,
				data: result
			};
		} catch (error) {
			AppLogger.error('Error in StudentInfo get_by_id', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}

	async get_by_email(email: string): Promise<RestApi.ObjectResInterface> {
		try {
			const result = await StudentModel.findOne({ where: { email } });

			return {
				is_success: !!result,
				data: result
			};
		} catch (error) {
			AppLogger.error('Error in StudentInfo get_by_email', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}

	async get_by_phone_number(phone: string): Promise<RestApi.ObjectResInterface> {
		try {
			const result = await StudentModel.findOne({ where: { phone } });

			return {
				is_success: !!result,
				data: result
			};
		} catch (error) {
			AppLogger.error('Error in StudentInfo get_by_phone_number', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}

	async get_by_national_code(national_code: string): Promise<RestApi.ObjectResInterface> {
		try {
			const result = await StudentModel.findOne({ where: { national_code } });

			return {
				is_success: !!result,
				data: result
			};
		} catch (error) {
			AppLogger.error('Error in StudentInfo get_by_national_code', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}

	async get_class_of_student(student_id: string): Promise<RestApi.ObjectResInterface> {
		try {
			const result = await StudentModel.findAll({
				where: { id: student_id },
				include: [
					{
						model: StudentClassesModel,
						include: [
							{
								model: ClassesModel,
								include: [
									{
										model: ClassLevelModel,
										include: [
											{
												model: SectionModel
											}
										]
									},
									{
										model: ClassTimingModel,
										required: false
									},
									{
										model: MajorModel,
										as: 'majors',
										required: false
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
			AppLogger.error('Error in StudentInfo get_class_of_student', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}
}
