import { AppLogger } from '../../../../lib/logger/Logger';
import StateModel from '../../models/state.model';

export class StateCreate {
	async create(name: string): Promise<RestApi.ObjectResInterface> {
		try {
			const result = await StateModel.create({ name }, { isNewRecord: true });

			return {
				is_success: !!result,
				data: result
			};
		} catch (error) {
			AppLogger.error('Error in StateCreate create', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}
}
