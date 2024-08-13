import { AppLogger } from '../../../../lib/logger/Logger';
import NewsModel from '../../models/news.model';

export class NewsDestroy {
	async destroy(id: string): Promise<RestApi.ObjectResInterface> {
		try {
			await NewsModel.destroy({ where: { id } });

			return {
				is_success: true
			};
		} catch (error) {
			AppLogger.error('Error in NewsDestroy destroy', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}
}
