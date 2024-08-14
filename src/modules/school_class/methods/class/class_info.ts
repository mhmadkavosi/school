import { Sequelize } from 'sequelize';
import { AppLogger } from '../../../../lib/logger/Logger';
import { make_random_string } from '../../../../utils/random_generator.utility';
import SchoolModel from '../../../school/models/school.model';
import StudentModel from '../../../student/models/student.model';
import ClassLevelModel from '../../models/class_level.model';
import ClassesModel from '../../models/classes.model';
import MajorModel from '../../models/major.model';

export class ClassInfo {
	async get_all_by_teacher_id(teacher_id: string): Promise<RestApi.ObjectResInterface> {
		try {
			const result = await ClassesModel.findAll({
				where: { teacher_id },
				include: [
					{ model: MajorModel },
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
				include: [{ model: MajorModel }, { model: ClassLevelModel }, { model: SchoolModel }]
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
				include: [{ model: MajorModel }, { model: ClassLevelModel }, { model: SchoolModel }]
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
				include: [{ model: MajorModel }, { model: ClassLevelModel }, { model: SchoolModel }]
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
}
