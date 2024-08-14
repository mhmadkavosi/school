import { AppLogger } from '../../../../lib/logger/Logger';
import NewsCategoryModel from '../../models/news_category.model';

export class NewsCategoryUpdate {
	async update(id: string, is_active: boolean, name: string): Promise<RestApi.ObjectResInterface> {
		try {
			const result = await NewsCategoryModel.update({ is_active, name }, { where: { id } });

			return {
				is_success: result[0] > 0
			};
		} catch (error) {
			AppLogger.error('Error in NewsCategoryUpdate update', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}
}
