import { Op } from 'sequelize';
import { AppLogger } from '../../../../lib/logger/Logger';
import ClassesModel from '../../../school_class/models/classes.model';
import StudentModel from '../../../student/models/student.model';
import ClassHomeWorkModel from '../../models/class_home_work.model';
import HomeWorkModel from '../../models/home_work.model';
import HomeWorkFilesModel from '../../models/home_work_files.model';
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

	async get_home_work_of_teacher(teacher_id: string, status: string): Promise<RestApi.ObjectResInterface> {
		try {
			const match: any = [{}];

			if (status) {
				const statuses = status.split(',');
				match.push({
					status: {
						[Op.in]: statuses
					}
				});
			}

			const result = await HomeWorkModel.findAll({
				where: {
					teacher_id
				},
				include: [
					{
						model: StudentHomeWorkModel,
						required: false,
						attributes: ['id', 'student_id', 'status'],
						where: match,
						include: [
							{
								model: StudentModel,
								attributes: ['id', 'name', 'family']
							}
						]
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
					},
					{
						model: HomeWorkFilesModel,
						required: false
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
