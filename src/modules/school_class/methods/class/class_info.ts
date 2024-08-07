import { AppLogger } from '../../../../lib/logger/Logger';
import { make_random_string } from '../../../../utils/random_generator.utility';
import ClassesModel from '../../models/classes.model';

export class ClassInfo {
	async get_all_by_teacher_id(teacher_id: string): Promise<RestApi.ObjectResInterface> {
		try {
			const result = await ClassesModel.findAll({ where: { teacher_id } });

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
			const result = await ClassesModel.findOne({ where: { link } });

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
			const result = await ClassesModel.findOne({ where: { id } });

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
			const result = await ClassesModel.findAll({ where: { school_id } });

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
