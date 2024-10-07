import { AppLogger } from '../../../../lib/logger/Logger';
import TeacherModel from '../../../teacher/models/teacher.model';
import HomeWorkModel from '../../models/home_work.model';
import HomeWorkFilesModel from '../../models/home_work_files.model';

export class HomeWorkInfo {
	async get_all_home_work_of_teacher(teacher_id: string): Promise<RestApi.ObjectResInterface> {
		try {
			const result = await HomeWorkModel.findAll({
				where: { teacher_id },
				include: [
					{
						model: HomeWorkFilesModel,
						required: false
					}
				]
			});

			return {
				is_success: true,
				data: result
			};
		} catch (error) {
			AppLogger.error('Error in HomeWorkInfo get_all_home_work_of_teacher', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}

	async get_home_work_info(id: string): Promise<RestApi.ObjectResInterface> {
		try {
			const result = await HomeWorkModel.findOne({
				where: { id },
				include: [
					{ model: TeacherModel },
					{
						model: HomeWorkFilesModel,
						required: false
					}
				]
			});

			return {
				is_success: true,
				data: result
			};
		} catch (error) {
			AppLogger.error('Error in HomeWorkInfo get_home_work_info', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}

	async get_info_by_id(id: string): Promise<RestApi.ObjectResInterface> {
		try {
			const result = await HomeWorkModel.findOne({
				where: { id },
				include: [
					{
						model: HomeWorkFilesModel,
						required: false
					}
				]
			});

			return {
				is_success: true,
				data: result
			};
		} catch (error) {
			AppLogger.error('Error in HomeWorkInfo get_info_by_id', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}
}
