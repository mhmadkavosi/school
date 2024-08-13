import { AppLogger } from '../../../lib/logger/Logger';
import StudentModel from '../models/student.model';

export class StudentDestroy {
	async destroy(id: string): Promise<RestApi.ObjectResInterface> {
		try {
			await StudentModel.destroy({ where: { id } });

			return { is_success: true };
		} catch (error) {
			AppLogger.error('Error in StudentDestroy destroy', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}
}
