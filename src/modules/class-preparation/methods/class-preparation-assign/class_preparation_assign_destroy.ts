import { AppLogger } from '../../../../lib/logger/Logger';
import ClassPreparationAssignModel from '../../models/class_preparation_assign.model';

export class ClassPreparationAssignDestroy {
	async destroy_by_class_preparation_assign_id(
		class_preparation_assign_id: string
	): Promise<RestApi.ObjectResInterface> {
		try {
			const result = await ClassPreparationAssignModel.destroy({
				where: {
					class_preparation_assign_id
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
	async destroy_by_class_id(class_id: string): Promise<RestApi.ObjectResInterface> {
		try {
			const result = await ClassPreparationAssignModel.destroy({
				where: {
					class_id
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
