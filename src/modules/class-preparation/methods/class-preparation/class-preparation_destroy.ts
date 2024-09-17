import { AppLogger } from '../../../../lib/logger/Logger';
import ClassPreparationModel from '../../models/classـpreparatoin.model';

export class ClassPreparationDestroy {
	async destroy(id: string, teacher_id: string): Promise<RestApi.ObjectResInterface> {
		try {
			const result = await ClassPreparationModel.destroy({
				where: {
					id,
					teacher_id
				}
			});

			return {
				is_success: result === 0
			};
		} catch (error) {
			AppLogger.error('Error in ClassPreparationAssignDestroy destroy', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}
}
