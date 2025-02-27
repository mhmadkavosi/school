import { Sequelize } from 'sequelize';
import { AppLogger } from '../../../lib/logger/Logger';
import SchoolModel from '../../school/models/school.model';
import SectionModel from '../../school/models/section.model';
import TeacherModel from '../models/teacher.model';
import MajorModel from '../../school_class/models/major.model';
import ClassesModel from '../../school_class/models/classes.model';
import ClassLevelModel from '../../school_class/models/class_level.model';
import StudentModel from '../../student/models/student.model';
import { paginate } from '../../../utils/paginate.utility';

export class TeacherInfo {
	async get_by_email(email: string): Promise<RestApi.ObjectResInterface> {
		try {
			const result = await TeacherModel.findOne({ where: { email } });

			return {
				is_success: !!result,
				data: result
			};
		} catch (error) {
			AppLogger.error('Error in TeacherInfo get_by_email', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}

	async get_by_phone_number(phone_number: string): Promise<RestApi.ObjectResInterface> {
		try {
			const result = await TeacherModel.findOne({ where: { phone_number } });

			return {
				is_success: !!result,
				data: result
			};
		} catch (error) {
			AppLogger.error('Error in TeacherInfo get_by_phone_number', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}

	async get_by_id(id: string): Promise<RestApi.ObjectResInterface> {
		try {
			const result = await TeacherModel.findOne({ where: { id } });

			return {
				is_success: !!result,
				data: result
			};
		} catch (error) {
			AppLogger.error('Error in TeacherInfo get_by_id', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}

	async get_details(id: string): Promise<RestApi.ObjectResInterface> {
		try {
			const result = await TeacherModel.findOne({
				where: { id },
				order: [['created_at', 'DESC']], // Ensure your TeacherModel timestamps are enabled or adjust the field name accordingly
				include: [
					{
						model: SchoolModel,
						attributes: ['id', 'name']
					},
					{
						model: MajorModel,
						attributes: ['name']
					},
					{
						model: ClassesModel,
						as: 'classes',
						attributes: ['id'],
						include: [
							{
								model: ClassLevelModel,
								attributes: ['name']
							},
							{
								model: StudentModel,
								attributes: ['id']
							}
						]
					}
				]
			});

			if (result === null) {
				return {
					is_success: false
				};
			}

			// Process each teacher record to build the desired output:
			// - teacher_name (concatenation of name and family)
			// - school_name from the School association
			// - major_name from the Major association
			// - class_level from (for example) the first class's associated ClassLevel
			// - total_student: sum of students across all classes taught by this teacher
			// Process each teacher record to build the final output.
			const teacherList = (teacher: any) => {
				const teacher_id = teacher.id;
				const teacher_name = `${teacher.name} ${teacher.family}`;
				const teacher_only_name = `${teacher.name}`;
				const school_name = teacher.school ? teacher.school.name : null;
				const school_id = teacher.school.id;
				const major_name = teacher.major ? teacher.major.name : null;
				const teacher_family = teacher.family;
				const teacher_email = teacher.email;
				const teacher_phone_number = teacher.phone_number;
				const teacher_about = teacher.about;
				const profile_picture = teacher.profile_picture;

				// Calculate the class level and total student count.
				// We assume that if a teacher has multiple classes, they share the same level.
				let class_level = null;
				let total_student = 0;

				if (teacher.classes && teacher.classes.length > 0) {
					// Use the first class's level as the teacher's class level.
					const firstClass = teacher.classes[0];
					class_level = firstClass.class_level ? firstClass.class_level.name : null;
					// Sum up the number of students across all classes.
					teacher.classes.forEach((cls: any) => {
						if (cls.students) {
							total_student += cls.students.length;
						}
					});
				}

				return {
					teacher_id,
					teacher_name,
					teacher_only_name,
					school_name,
					major_name,
					class_level,
					total_student,
					school_id,
					teacher_family,
					teacher_email,
					teacher_phone_number,
					teacher_about,
					profile_picture
				};
			};
			const data = teacherList(result);
			return {
				is_success: true,
				data
			};
		} catch (error) {
			AppLogger.error('Error in TeacherInfo get_by_id', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}

	async get_all_by_school_id(school_id: string): Promise<RestApi.ObjectResInterface> {
		try {
			const result = await TeacherModel.findAll({ where: { school_id } });

			return {
				is_success: true,
				data: result
			};
		} catch (error) {
			AppLogger.error('Error in TeacherInfo get_all_by_school_id', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}

	async get_total_teachers(): Promise<RestApi.ObjectResInterface> {
		try {
			const totalTeachers = await TeacherModel.count();
			return {
				is_success: true,
				data: totalTeachers
			};
		} catch (error) {
			AppLogger.error('Error in TeacherInfo get_total_teachers', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}

	async get_teachers_group_by_section(): Promise<RestApi.ObjectResInterface> {
		try {
			const result = await TeacherModel.findAll({
				include: [
					{
						model: SchoolModel,
						as: 'school', // alias for the School association
						required: true, // only include teachers with an associated school
						attributes: [], // we don't need any school fields in the output
						include: [
							{
								model: SectionModel,
								as: 'section', // alias for the Section association
								required: true, // only include schools that have an associated section
								attributes: [] // we only need the section name
							}
						]
					}
				],
				attributes: [
					// Count teachers using the Teacher model's id.
					[Sequelize.fn('COUNT', Sequelize.col('Teacher.id')), 'total_teachers'],
					// Get the section name from the nested include.
					[Sequelize.col('school.section.name'), 'section_name']
				],
				group: ['school.section.name'],
				raw: true
			});

			return {
				is_success: true,
				data: result
			};
		} catch (error) {
			AppLogger.error('Error in TeacherInfo get_teachers_group_by_section', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}
	async get_teacher_list(page: number, limit: number): Promise<RestApi.ObjectResInterface> {
		try {
			const skip = (page - 1) * limit;

			const result = await TeacherModel.findAndCountAll({
				distinct: true,
				limit,
				offset: skip,
				order: [['created_at', 'DESC']], // Ensure your TeacherModel timestamps are enabled or adjust the field name accordingly
				include: [
					{
						model: SchoolModel,
						attributes: ['name']
					},
					{
						model: MajorModel,
						attributes: ['name']
					},
					{
						model: ClassesModel,
						as: 'classes',
						attributes: ['id'],
						include: [
							{
								model: ClassLevelModel,
								attributes: ['name']
							},
							{
								model: StudentModel,
								attributes: ['id']
							}
						]
					}
				]
			});

			// Process each teacher record to build the desired output:
			// - teacher_name (concatenation of name and family)
			// - school_name from the School association
			// - major_name from the Major association
			// - class_level from (for example) the first class's associated ClassLevel
			// - total_student: sum of students across all classes taught by this teacher
			// Process each teacher record to build the final output.
			const teacherList = result.rows.map((teacher: any) => {
				const teacher_id = teacher.id;
				const teacher_name = `${teacher.name} ${teacher.family}`;
				const school_name = teacher.school ? teacher.school.name : null;
				const major_name = teacher.major ? teacher.major.name : null;

				// Calculate the class level and total student count.
				// We assume that if a teacher has multiple classes, they share the same level.
				let class_level = null;
				let total_student = 0;

				if (teacher.classes && teacher.classes.length > 0) {
					// Use the first class's level as the teacher's class level.
					const firstClass = teacher.classes[0];
					class_level = firstClass.class_level ? firstClass.class_level.name : null;
					// Sum up the number of students across all classes.
					teacher.classes.forEach((cls: any) => {
						if (cls.students) {
							total_student += cls.students.length;
						}
					});
				}

				return { teacher_id, teacher_name, school_name, major_name, class_level, total_student };
			});
			return {
				is_success: true,
				data: paginate(page, limit, { count: result.count, rows: teacherList })
			};
		} catch (error) {
			AppLogger.error('Error in get_teacher_list', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}
}
