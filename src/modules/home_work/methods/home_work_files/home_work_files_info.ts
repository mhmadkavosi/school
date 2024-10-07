import { AppLogger } from '../../../../lib/logger/Logger';
import HomeWorkFilesModel from '../../models/home_work_files.model';

export class HomeWorkFilesInfo {
	async get_info_by_id(file_id: string): Promise<RestApi.ObjectResInterface> {
		try {
			const result = await HomeWorkFilesModel.findOne({ where: { id: file_id } });

			return { is_success: !!result, data: result };
		} catch (error) {
			AppLogger.error('Error in HomeWorkFilesInfo get_info_by_id', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}
}
