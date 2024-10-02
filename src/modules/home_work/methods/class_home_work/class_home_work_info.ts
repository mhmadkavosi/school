import { AppLogger } from '../../../../lib/logger/Logger';
import ClassesModel from '../../../school_class/models/classes.model';
import ClassHomeWorkModel from '../../models/class_home_work.model';
import HomeWorkModel from '../../models/home_work.model';
import StudentHomeWorkModel from '../../models/student_home_work.model';

export class ClassHomeWorkInfo {
	async get_info(class_id: string, home_work_id: string): Promise<RestApi.ObjectResInterface> {
		try {
			const result = await ClassHomeWorkModel.findOne({ where: { class_id, home_work_id } });

			return {
				is_success: !!result,
				data: result
			};
		} catch (error) {
			AppLogger.error('Error in ClassHomeWorkInfo get_info', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}

	async get_info_by_class(class_id: string): Promise<RestApi.ObjectResInterface> {
		try {
			const result = await ClassHomeWorkModel.findAll({ where: { class_id } });

			return {
				is_success: !!result,
				data: result
			};
		} catch (error) {
			AppLogger.error('Error in ClassHomeWorkInfo get_info', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}

	async get_count_of_class_home_work(class_id: string): Promise<RestApi.ObjectResInterface> {
		try {
			const result = await ClassHomeWorkModel.count({ where: { class_id } });

			return {
				is_success: !!result,
				data: result
			};
		} catch (error) {
			AppLogger.error('Error in ClassHomeWorkInfo get_info', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}

	async get_home_work_of_teacher(teacher_id: string): Promise<RestApi.ObjectResInterface> {
		try {
			const result = await HomeWorkModel.findAll({
				where: {
					teacher_id
				},
				include: [
					{
						model: StudentHomeWorkModel,
						where: {
							class_home_work_id: null
						},
						required: false,
						attributes: ['id', 'student_id', 'status']
					},
					{
						model: ClassHomeWorkModel,
						required: false,
						include: [
							{
								model: ClassesModel,
								attributes: ['name', 'id']
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
			AppLogger.error('Error in ClassHomeWorkInfo get_info', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}
}
