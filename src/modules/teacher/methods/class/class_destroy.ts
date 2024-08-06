import { AppLogger } from '../../../../lib/logger/Logger';
import ClassesModel from '../../models/classes.model';

export class ClassDestroy {
	async destroy(id: string, teacher_id: string): Promise<RestApi.ObjectResInterface> {
		try {
			await ClassesModel.destroy({ where: { id, teacher_id } });

			return { is_success: true };
		} catch (error) {
			AppLogger.error('Error in ClassDestroy destroy', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}
}
