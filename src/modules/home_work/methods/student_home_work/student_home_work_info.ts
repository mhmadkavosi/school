import { Op, Sequelize } from 'sequelize';
import { AppLogger } from '../../../../lib/logger/Logger';
import StudentHomeWorkModel from '../../models/student_home_work.model';
import StudentModel from '../../../student/models/student.model';
import { paginate } from '../../../../utils/paginate.utility';

export class StudentHomeWrkInfo {
	async get_info_by_student_id_home_work_id(
		student_id: string,
		home_work_id: string
	): Promise<RestApi.ObjectResInterface> {
		try {
			const result = await StudentHomeWorkModel.findOne({ where: { student_id, home_work_id } });

			return {
				is_success: !!result,
				data: result
			};
		} catch (error) {
			AppLogger.error('Error in StudentHomeWrkInfo get_info_by_student_id_home_work_id', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}

	async get_count_of_status_home_works(home_work_id: string): Promise<RestApi.ObjectResInterface> {
		try {
			const result = await StudentHomeWorkModel.findAll({
				where: { home_work_id },
				attributes: ['status', [Sequelize.fn('COUNT', 'id'), 'count']],
				group: ['status']
			});

			return {
				is_success: !!result,
				data: result
			};
		} catch (error) {
			AppLogger.error('Error in StudentHomeWrkInfo get_count_of_status_home_works', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}

	async get_student_of_home_work(
		page: number,
		limit: number,
		home_work_id: string,
		status: string
	): Promise<RestApi.ObjectResInterface> {
		try {
			const skip = (page - 1) * limit;
			const match: any = [{ home_work_id }];
			if (status) {
				match.push({
					status: status
				});
			}
			const result = await StudentHomeWorkModel.findAndCountAll({
				where: { [Op.and]: match },
				distinct: true,
				limit: limit,
				offset: skip,

				include: [
					{
						model: StudentModel,
						attributes: ['name', 'family']
					}
				]
			});

			return {
				is_success: !!result,
				data: paginate(page, limit, result)
			};
		} catch (error) {
			AppLogger.error('Error in StudentHomeWrkInfo get_count_of_status_home_works', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}
}
