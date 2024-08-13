import { AppLogger } from '../../../../lib/logger/Logger';
import NewsCategoryModel from '../../models/news_category.model';

export class NewsCategoryCreate {
	async create(name: string): Promise<RestApi.ObjectResInterface> {
		try {
			const result = await NewsCategoryModel.create({ name }, { isNewRecord: true });

			return {
				is_success: !!result,
				data: result
			};
		} catch (error) {
			AppLogger.error('Error in NewsCategoryCreate create', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}
}
