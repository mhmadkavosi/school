import { Op, Sequelize } from 'sequelize';
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
import { paginate } from '../../../../utils/paginate.utility';

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
			const result = await SchoolModel.findAll({
				where: { id: school_id },
				include: [
					{
						model: ClassesModel,
						as: 'classes',
						include: [
							{
								model: ClassLevelModel
							}
						]
					}
				]
			});

			return {
				is_success: true,
				data: result
			};
		} catch (error) {
			AppLogger.error('Error in ClassInfo get_all_by_school_id', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}

	async get_all_by_school_id_admin(school_id: string): Promise<RestApi.ObjectResInterface> {
		try {
			const result = await SchoolModel.findAll({
				where: { id: school_id },
				include: [
					{
						model: ClassesModel,
						as: 'classes',
						attributes: [
							'id',
							'name', // Assuming 'name' is the class name field,
							[
								Sequelize.literal(
									`COALESCE((SELECT COUNT(*) FROM students WHERE students.class_id = classes.id), 0)`
								),
								'total_students'
							]
						],
						include: [
							{
								model: ClassLevelModel
							},
							{
								model: StudentModel,
								as: 'students', // Make sure the alias matches your associations
								attributes: ['id']
							}
						]
					}
				],
				group: ['school.id', 'classes.id', 'classes->class_level.id', 'classes->students.id']
			});

			return {
				is_success: true,
				data: result
			};
		} catch (error) {
			AppLogger.error('Error in ClassInfo get_all_by_school_id', error);
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
					created_at: {
						[Op.gte]: new Date(start_date + 'T' + '00:00:00' + '.000Z'),
						[Op.lte]: new Date(end_date + 'T' + '23:59:00' + '.000Z')
					}
				});
			} else if (start_date) {
				match.push({
					created_at: {
						[Op.gte]: new Date(start_date + 'T' + '00:00:00' + '.000Z'),
						[Op.lte]: new Date(start_date + 'T' + '23:59:00' + '.000Z')
					}
				});
			} else if (end_date) {
				match.push({
					created_at: {
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
					attributes: ['id', 'attendance_type'],
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

	async get_classes_by_teacher(
		teacher_id: string,
		limit: number,
		page: number
	): Promise<RestApi.ObjectResInterface> {
		try {
			const skip = (page - 1) * limit;

			// Retrieve classes for the given teacher ID with a nested include of students.
			const result = await ClassesModel.findAndCountAll({
				where: { teacher_id },
				distinct: true,
				limit,
				offset: skip,
				attributes: ['id', 'name', 'link', 'count', 'color', 'major', 'major_type'], // Only need the class name from ClassesModel
				include: [
					{
						model: StudentModel,
						as: 'students', // Must match the alias defined in ClassesModel.hasMany(StudentModel, { as: 'students' })
						attributes: ['id'] // Only need the id to count the number of students
					},
					{
						model: ClassLevelModel,
						attributes: ['name', 'level', 'id']
					}
				]
			});

			// Map each class to an object with class name and total student count.
			const classesList = result.rows.map((cls: any) => {
				const class_name = cls.name;
				const class_link = cls.link;
				const class_id = cls.id;
				const class_count = cls.count;
				const class_color = cls.color;
				const class_major = cls.major;
				const class_major_type = cls.major_type;
				const class_level = cls.class_level;
				// Total students is the length of the students array (or 0 if undefined)
				const total_student = cls.students ? cls.students.length : 0;
				return {
					class_link,
					class_id,
					class_name,
					total_student,
					class_count,
					class_color,
					class_major,
					class_major_type,
					class_level
				};
			});

			return {
				is_success: true,
				data: paginate(page, limit, { count: result.count, rows: classesList })
			};
		} catch (error) {
			AppLogger.error('Error in get_classes_by_teacher', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}
}
