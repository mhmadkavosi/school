import { AppLogger } from '../../../../lib/logger/Logger';
import SchoolModel from '../../../school/models/school.model';

export class ScheduleDestroy {
	async destroy(id: string): Promise<RestApi.ObjectResInterface> {
		try {
			const result = await SchoolModel.destroy({ where: { id } });

			return {
				is_success: true
			};
		} catch (error) {
			AppLogger.error('Error in ScheduleDestroy destroy', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}
}
