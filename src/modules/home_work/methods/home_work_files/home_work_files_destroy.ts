import { AppLogger } from '../../../../lib/logger/Logger';
import HomeWorkFilesModel from '../../models/home_work_files.model';

export class HomeWorkFilesDestroy {
	async destroy(home_work_id: string, file_id: string): Promise<RestApi.ObjectResInterface> {
		try {
			const result = await HomeWorkFilesModel.destroy({ where: { home_work_id, id: file_id } });

			return { is_success: true };
		} catch (error) {
			AppLogger.error('Error in HomeWorkFilesDestroy destroy', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}
}
