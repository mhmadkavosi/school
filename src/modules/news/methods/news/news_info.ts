import { AppLogger } from '../../../../lib/logger/Logger';
import { paginate } from '../../../../utils/paginate.utility';
import NewsModel from '../../models/news.model';
import NewsCategoryModel from '../../models/news_category.model';

export class NewsInfo {
	async get_all_news_by_school_id(
		school_id: string,
		page: number,
		limit: number
	): Promise<RestApi.ObjectResInterface> {
		try {
			const skip = (page - 1) * limit;

			const result = await NewsModel.findAndCountAll({
				where: { school_id },
				distinct: true,
				limit: limit,
				offset: skip,
				order: [['created_at', 'DESC']],
				include: [{ model: NewsCategoryModel }]
			});

			return {
				is_success: true,
				data: paginate(page, limit, result)
			};
		} catch (error) {
			AppLogger.error('Error in NewsInfo get_all_news_by_school_id', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}

	async get_all_news_by_category_id(
		news_category_id: string,
		page: number,
		limit: number
	): Promise<RestApi.ObjectResInterface> {
		try {
			const skip = (page - 1) * limit;

			const result = await NewsModel.findAndCountAll({
				where: { news_category_id },
				distinct: true,
				limit: limit,
				offset: skip,
				order: [['created_at', 'DESC']],
				include: [{ model: NewsCategoryModel }]
			});

			return {
				is_success: true,
				data: paginate(page, limit, result)
			};
		} catch (error) {
			AppLogger.error('Error in NewsInfo get_all_news_by_category_id', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}

	async get_info_by_id(id: string): Promise<RestApi.ObjectResInterface> {
		try {
			const result = await NewsModel.findOne({ where: { id } });

			return { is_success: !!result, data: result };
		} catch (error) {
			AppLogger.error('Error in NewsInfo get_info_by_id', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}
}
