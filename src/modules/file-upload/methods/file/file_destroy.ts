import { AppLogger } from '../../../../lib/logger/Logger';
import FileModel from '../../models/file.model';

export class FileDestroy {
	/**
	 *
	 * @param url
	 * @param user_id
	 */
	async destroy(url: string, user_id: string): Promise<RestApi.ObjectResInterface> {
		try {
			const destroy = await FileModel.destroy({ where: { url: url, user_id: user_id } });

			return {
				is_success: destroy > 0
			};
		} catch (error) {
			AppLogger.error('Error in FileDestroy:destroy ', error);
			return {
				is_success: false
			};
		}
	}

	/**
	 *
	 * @param url
	 */
	async destroy_for_admin(url: string): Promise<RestApi.ObjectResInterface> {
		try {
			const destroy = await FileModel.destroy({ where: { url: url } });

			return {
				is_success: destroy > 0
			};
		} catch (error) {
			AppLogger.error('Error in FileDestroy:destroy_for_admin ', error);
			return {
				is_success: false
			};
		}
	}
}
