import { AppLogger } from '../../../../lib/logger/Logger';
import SectionModel from '../../models/section.model';

export class SectionCreate {
	async create(name: string): Promise<RestApi.ObjectResInterface> {
		try {
			const result = await SectionModel.create({ name }, { isNewRecord: true });

			return {
				is_success: !!result,
				data: result
			};
		} catch (error) {
			AppLogger.error('Error in SectionCreate create', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}
}
