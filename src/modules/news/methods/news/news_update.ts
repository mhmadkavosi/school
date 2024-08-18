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
		file_type: string,
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
					priority,
					file_type
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

	async auto_increment_view(id: string): Promise<RestApi.ObjectResInterface> {
		try {
			await NewsModel.increment('views', { by: 1, where: { id } });

			return {
				is_success: true
			};
		} catch (error) {
			AppLogger.error('Error in NewsUpdate auto_increment_view', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}

	async update_add_file(id: string, file: string, file_type: string): Promise<RestApi.ObjectResInterface> {
		try {
			const result = await NewsModel.update({ file, file_type }, { where: { id } });

			return {
				is_success: result[0] > 0
			};
		} catch (error) {
			AppLogger.error('Error in HomeWorkUpdate update_add_file', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}

	async remove_file(id: string): Promise<RestApi.ObjectResInterface> {
		try {
			const result = await NewsModel.update({ file: null, file_type: null }, { where: { id } });

			return {
				is_success: result[0] > 0
			};
		} catch (error) {
			AppLogger.error('Error in HomeWorkUpdate remove_file', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}
}
