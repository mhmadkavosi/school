import { AppLogger } from '../../../lib/logger/Logger';
import { SexEnum } from '../models/enums/sex.enum';
import SchoolModel from '../models/school.model';

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
}
