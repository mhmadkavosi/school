import { AppLogger } from '../../../../lib/logger/Logger';
import NewsModel from '../../models/news.model';
import { NewsBuilder } from './news.builder';

export class NewsCreate {
	async create(builder: NewsBuilder): Promise<RestApi.ObjectResInterface> {
		try {
			const result = await NewsModel.create(
				{
					school_id: builder.getSchoolId(),
					title: builder.getTitle(),
					news_category_id: builder.getNewsCategoryId(),
					description: builder.getDescription(),
					file: builder.getFile(),
					priority: builder.getPriority()
				},
				{
					isNewRecord: true
				}
			);

			return {
				is_success: !!result,
				data: result
			};
		} catch (error) {
			AppLogger.error('Error in NewsCreate create', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}
}
