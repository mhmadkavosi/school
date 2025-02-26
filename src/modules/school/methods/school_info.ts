import { Sequelize } from 'sequelize';
import { AppLogger } from '../../../lib/logger/Logger';
import { SexEnum } from '../models/enums/sex.enum';
import SchoolModel from '../models/school.model';
import SectionModel from '../models/section.model';
import ClassesModel from '../../school_class/models/classes.model';
import TeacherModel from '../../teacher/models/teacher.model';
import StudentModel from '../../student/models/student.model';
import { paginate } from '../../../utils/paginate.utility';

export class SchoolInfo {
	async get_all(): Promise<RestApi.ObjectResInterface> {
		try {
			const result = await SchoolModel.findAll({ where: { is_active: true } });

			return {
				is_success: true,
				data: result
			};
		} catch (error) {
			AppLogger.error('Error in SchoolInfo get_all', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}

	async get_info_by_id(id: string): Promise<RestApi.ObjectResInterface> {
		try {
			const result = await SchoolModel.findAll({ where: { id } });

			return {
				is_success: !!result,
				data: result
			};
		} catch (error) {
			AppLogger.error('Error in SchoolInfo get_info_by_id', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}

	async get_info_by_id_admin(id: string): Promise<RestApi.ObjectResInterface> {
		try {
			// Retrieve schools along with their associated section and classes.
			// For each class, load its teacher and its students.
			const result = await SchoolModel.findOne({
				where: { id },
				order: [['created_at', 'DESC']], // Adjust if your timestamp field is named differently.
				include: [
					{
						model: SectionModel,
						as: 'section',
						attributes: ['name']
					},
					{
						model: ClassesModel,
						as: 'classes',
						attributes: ['id'], // Only need the id for counting classes.
						include: [
							{
								model: TeacherModel,
								as: 'teacher',
								attributes: ['id'] // We need the teacher id to count unique teachers.
							},
							{
								model: StudentModel,
								as: 'students',
								attributes: ['id'] // Only need the id for counting students.
							}
						]
					}
				]
			});

			// Post-process the result to build the output fields.
			const schoolList = (school: any) => {
				const school_id = school.id;
				const school_name = school.name;
				const level = school.section ? school.section.name : null;
				const total_class = school.classes ? school.classes.length : 0;

				// Sum up students across all classes.
				let total_students = 0;
				// Use a Set to collect unique teacher ids.
				const teacherSet = new Set<string>();

				if (school.classes && school.classes.length > 0) {
					school.classes.forEach((cls: any) => {
						if (cls.students) {
							total_students += cls.students.length;
						}
						if (cls.teacher && cls.teacher.id) {
							teacherSet.add(cls.teacher.id);
						}
					});
				}

				const total_teachers = teacherSet.size;
				return { school_id, school_name, level, total_class, total_students, total_teachers };
			};

			const data = schoolList(result);

			return {
				is_success: true,
				data
			};
		} catch (error) {
			AppLogger.error('Error in SchoolInfo get_info_by_id_admin', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}

	async get_info_by_sex(sex: SexEnum): Promise<RestApi.ObjectResInterface> {
		try {
			const result = await SchoolModel.findAll({ where: { sex, is_active: true } });

			return {
				is_success: !!result,
				data: result
			};
		} catch (error) {
			AppLogger.error('Error in SchoolInfo get_info_by_sex', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}

	async get_total_school(): Promise<RestApi.ObjectResInterface> {
		try {
			const totalSchool = await SchoolModel.count();
			return {
				is_success: true,
				data: totalSchool
			};
		} catch (error) {
			AppLogger.error('Error in get_total_school', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}

	async get_total_school_by_category(): Promise<RestApi.ObjectResInterface> {
		try {
			const result = await SchoolModel.findAll({
				include: [
					{
						model: SectionModel,
						as: 'section', // Ensure your SchoolModel association is defined with { as: 'section' }
						required: true, // Only include schools with an associated section
						attributes: [] // We only need the section's name
					}
				],
				attributes: [
					// Use the correct alias "school" (or just remove the alias if not set)
					[Sequelize.fn('COUNT', Sequelize.col('school.id')), 'total_schools'],
					// Get the category from the section's name
					[Sequelize.col('section.name'), 'category']
				],
				group: ['section.name'],
				raw: true
			});

			return {
				is_success: true,
				data: result
			};
		} catch (error) {
			AppLogger.error('Error in get_total_school_by_category', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}

	async get_all_school_info(page: number, limit: number, sex: string): Promise<RestApi.ObjectResInterface> {
		try {
			const skip = (page - 1) * limit;
			const match: any = [{}];

			if (sex) {
				match.push({ sex: sex });
			}

			// Retrieve schools along with their associated section and classes.
			// For each class, load its teacher and its students.
			const result = await SchoolModel.findAndCountAll({
				distinct: true,
				limit,
				where: match,
				offset: skip,
				order: [['created_at', 'DESC']], // Adjust if your timestamp field is named differently.
				include: [
					{
						model: SectionModel,
						as: 'section',
						attributes: ['name']
					},
					{
						model: ClassesModel,
						as: 'classes',
						attributes: ['id'], // Only need the id for counting classes.
						include: [
							{
								model: TeacherModel,
								as: 'teacher',
								attributes: ['id'] // We need the teacher id to count unique teachers.
							},
							{
								model: StudentModel,
								as: 'students',
								attributes: ['id'] // Only need the id for counting students.
							}
						]
					}
				]
			});

			// Post-process the result to build the output fields.
			const schoolList = result.rows.map((school: any) => {
				const school_id = school.id;
				const school_name = school.name;
				const level = school.section ? school.section.name : null;
				const total_class = school.classes ? school.classes.length : 0;

				// Sum up students across all classes.
				let total_students = 0;
				// Use a Set to collect unique teacher ids.
				const teacherSet = new Set<string>();

				if (school.classes && school.classes.length > 0) {
					school.classes.forEach((cls: any) => {
						if (cls.students) {
							total_students += cls.students.length;
						}
						if (cls.teacher && cls.teacher.id) {
							teacherSet.add(cls.teacher.id);
						}
					});
				}

				const total_teachers = teacherSet.size;
				return { school_id, school_name, level, total_class, total_students, total_teachers };
			});

			return {
				is_success: true,
				data: paginate(page, limit, { count: result.count, rows: schoolList })
			};
		} catch (error) {
			AppLogger.error('Error in get_all_school_info', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}
}
