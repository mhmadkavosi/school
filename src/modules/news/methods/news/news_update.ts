import { AppLogger } from '../../../../lib/logger/Logger';
import NewsModel from '../../models/news.model';

export class NewsUpdate {
	async update(
		id: string,
		school_id: string,
		title: string,
		news_category_id: string,
		description: string,
		file: string,
		priority: string
	): Promise<RestApi.ObjectResInterface> {
		try {
			const result = await NewsModel.update(
				{
					school_id,
					title,
					news_category_id,
					description,
					file,
					priority
				},
				{
					where: {
						id
					}
				}
			);

			return {
				is_success: !!result,
				data: result
			};
		} catch (error) {
			AppLogger.error('Error in NewsUpdate update', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}
}
