import { AppLogger } from '../../../../lib/logger/Logger';
import HomeWorkFilesModel from '../../models/home_work_files.model';

export class HomeWorkFilesCreate {
	async create(home_work_id: string, file: string, file_type: string): Promise<RestApi.ObjectResInterface> {
		try {
			const result = await HomeWorkFilesModel.create(
				{ home_work_id, file, file_type },
				{ isNewRecord: true }
			);

			return { is_success: !!result, data: result };
		} catch (error) {
			AppLogger.error('Error in HomeWorkFilesCreate create', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}
}
