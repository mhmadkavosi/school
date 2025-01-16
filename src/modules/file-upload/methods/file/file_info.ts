import { AppLogger } from '../../../../lib/logger/Logger';
import FileModel from '../../models/file.model';

export class FileInfo {
	/**
	 *
	 * @param url
	 * @param user_id
	 */
	async get_by_url(url: string, user_id: string | null): Promise<RestApi.ObjectResInterface> {
		try {
			const file = await FileModel.findOne({
				where: {
					url: url,
					user_id: user_id
				}
			});

			return {
				is_success: true,
				data: file
			};
		} catch (error) {
			AppLogger.error('Error in FileInfo:get_by_url ', error);
			return {
				is_success: false
			};
		}
	}
}
