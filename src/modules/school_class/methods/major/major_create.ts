import { AppLogger } from '../../../../lib/logger/Logger';
import MajorModel from '../../models/major.model';

export class MajorCreate {
	async create(name: string): Promise<RestApi.ObjectResInterface> {
		try {
			const result = await MajorModel.create({ name }, { isNewRecord: true });

			return {
				is_success: !!result,
				data: result
			};
		} catch (error) {
			AppLogger.error('Error in MajorCreate create', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}
}
