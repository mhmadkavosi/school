import { Op } from 'sequelize';
import { AppLogger } from '../../../../lib/logger/Logger';
import ClassPreparationAssignModel from '../../models/class_preparation_assign.model';
import ClassesModel from '../../../school_class/models/classes.model';
import ClassPreparationModel from '../../models/classـpreparatoin.model';
import { paginate } from '../../../../utils/paginate.utility';

export class ClassPreparationAssignInfo {
	async get_all(
		page: number,
		limit: number,
		teacher_id: string,
		start_date: string,
		end_date: string,
		class_id: string
	): Promise<RestApi.ObjectResInterface> {
		try {
			const skip = (page - 1) * limit;
			const match: any = [{ teacher_id }];
			const class_match = [{}];

			if (class_id) {
				class_match.push({
					class_id
				});
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
			const result = await ClassPreparationAssignModel.findAndCountAll({
				where: { [Op.and]: class_match },
				include: [
					{
						model: ClassPreparationModel,
						where: { [Op.and]: match }
					},
					{ model: ClassesModel, attributes: ['id', 'name'] }
				],
				distinct: true,
				limit: limit,
				offset: skip
			});

			return {
				is_success: !!result,
				data: paginate(page, limit, result)
			};
		} catch (error) {
			AppLogger.error('Error in ClassPreparationAssignInfo get_all', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}

	async get_info(class_preparation_id: string, teacher_id: string): Promise<RestApi.ObjectResInterface> {
		try {
			const result = await ClassPreparationAssignModel.findOne({
				where: { class_preparation_id },
				include: [
					{ model: ClassPreparationModel, where: { teacher_id } },
					{ model: ClassesModel, attributes: ['id', 'name'] }
				]
			});

			return {
				is_success: !!result,
				data: result
			};
		} catch (error) {
			AppLogger.error('Error in ClassPreparationAssignInfo get_info', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}
}
