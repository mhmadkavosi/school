import { AppLogger } from '../../../../lib/logger/Logger';
import MajorModel from '../../models/major.model';

export class MajorInfo {
	async get_all(): Promise<RestApi.ObjectResInterface> {
		try {
			const result = await MajorModel.findAll({ where: { is_active: true } });

			return {
				is_success: true,
				data: result
			};
		} catch (error) {
			AppLogger.error('Error in MajorInfo get_all', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}

	async get_info_by_id(id: string): Promise<RestApi.ObjectResInterface> {
		try {
			const result = await MajorModel.findAll({ where: { id } });

			return {
				is_success: !!result,
				data: result
			};
		} catch (error) {
			AppLogger.error('Error in MajorInfo get_info_by_id', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}
}
