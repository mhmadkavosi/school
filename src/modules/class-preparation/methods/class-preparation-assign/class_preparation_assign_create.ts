import { AppLogger } from '../../../../lib/logger/Logger';
import ClassPreparationAssignModel from '../../models/class_preparation_assign.model';

export class ClassPreparationAssignCreate {
	async create(class_id: string, class_preparation_id: string): Promise<RestApi.ObjectResInterface> {
		try {
			const result = await ClassPreparationAssignModel.create(
				{ class_id, class_preparation_id },
				{ isNewRecord: true }
			);

			return {
				is_success: !!result,
				data: result
			};
		} catch (error) {
			AppLogger.error('Error in ClassPreparationAssignCreate create', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}
}
