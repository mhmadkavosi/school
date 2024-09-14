import { Op } from 'sequelize';
import { AppLogger } from '../../../../lib/logger/Logger';
import { make_random_string } from '../../../../utils/random_generator.utility';
import SchoolModel from '../../../school/models/school.model';
import StudentModel from '../../../student/models/student.model';
import ClassLevelModel from '../../models/class_level.model';
import ClassesModel from '../../models/classes.model';
import StudentHomeWorkModel from '../../../home_work/models/student_home_work.model';
import { StudentHomeWorkStatusEnum } from '../../../home_work/models/enums/student_home_work.enum';
import StudentExamModel from '../../../exam/models/student_exam.model';
import AttendanceModel from '../../../attendance/models/attendance.model';
import { AttendanceTypeEnum } from '../../../attendance/models/enums/attendance_type.enum';

export class ClassInfo {
	async get_all_by_teacher_id(teacher_id: string): Promise<RestApi.ObjectResInterface> {
		try {
			const result = await ClassesModel.findAll({
				where: { teacher_id },
				include: [
					{ model: ClassLevelModel },
					{ model: SchoolModel },
					{
						model: StudentModel,
						attributes: ['id']
					}
				]
			});

			return {
				is_success: true,
				data: result
			};
		} catch (error) {
			AppLogger.error('Error in ClassInfo get_all_by_teacher_id', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}

	async get_by_link(link: string): Promise<RestApi.ObjectResInterface> {
		try {
			const result = await ClassesModel.findOne({
				where: { link },
				include: [{ model: ClassLevelModel }, { model: SchoolModel }]
			});

			return {
				is_success: !!result,
				data: result
			};
		} catch (error) {
			AppLogger.error('Error in ClassInfo get_by_link', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}
	async get_link() {
		try {
			while (true) {
				const string = make_random_string(10);

				const find_strings = await this.get_by_link(string);
				if (!find_strings.is_success) {
					return string;
				}
			}
		} catch (error) {
			console.log(error);
		}
	}

	async get_by_id(id: string): Promise<RestApi.ObjectResInterface> {
		try {
			const result = await ClassesModel.findOne({
				where: { id },
				include: [{ model: ClassLevelModel }, { model: SchoolModel }]
			});

			return {
				is_success: !!result,
				data: result
			};
		} catch (error) {
			AppLogger.error('Error in ClassInfo get_by_id', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}

	async get_all_by_school_id(school_id: string): Promise<RestApi.ObjectResInterface> {
		try {
			const result = await ClassesModel.findAll({
				where: { school_id },
				include: [{ model: ClassLevelModel }, { model: SchoolModel }]
			});

			return {
				is_success: true,
				data: result
			};
		} catch (error) {
			AppLogger.error('Error in ClassInfo get_by_id', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}

	async get_student_for_exports(
		class_id: string,
		teacher_id: string,
		search: string,
		home_work: string,
		exam: string,
		attendance: string,
		sort: string,
		student_status: string,
		start_date: string,
		end_date: string
	): Promise<RestApi.ObjectResInterface> {
		try {
			const match: any = [];
			const attributes = ['name', 'family'];
			let conditions: any = [];

			if (search) {
				conditions = attributes.map((attribute) => ({
					[attribute]: { [Op.like]: `%${search}%` }
				}));
			}

			if (!!class_id) {
				match.push({
					class_id
				});
			}

			if (student_status) {
				match.push({
					student_status
				});
			}

			let sort_value = '';
			if (sort === 'desc') {
				sort_value = 'DESC';
			} else if (sort === 'asc') {
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

			const include_options: any = [];
			if (home_work) {
				include_options.push({
					model: StudentHomeWorkModel,
					where: {
						status: { [Op.ne]: StudentHomeWorkStatusEnum.done }
					},
					attributes: ['id', 'status'],
					required: false
				});
			}
			if (exam) {
				include_options.push({
					model: StudentExamModel,
					attributes: ['id', 'points'],
					required: false
				});
			}
			if (attendance) {
				include_options.push({
					model: AttendanceModel,
					where: {
						attendance_type: { [Op.ne]: AttendanceTypeEnum.present }
					},
					attributes: ['id'],
					required: false
				});
			}

			const result = await ClassesModel.findAll({
				where: { teacher_id },
				include: [
					{
						model: StudentModel,
						attributes: ['id', 'name', 'family', 'student_status', 'class_id', 'created_at'],
						where: {
							[Op.and]: match,
							...(conditions &&
								conditions.length > 0 && {
									[Op.or]: conditions
								})
						},
						include: include_options,
						order: [['created_at', sort_value]]
					}
				]
			});

			return {
				is_success: true,
				data: result
			};
		} catch (error) {
			AppLogger.error('Error in StudentInfo get_student_for_exports', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}
}
