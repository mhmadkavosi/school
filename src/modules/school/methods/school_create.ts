import { AppLogger } from '../../../lib/logger/Logger';
import { SexEnum } from '../models/enums/sex.enum';
import SchoolModel from '../models/school.model';

export class SchoolCreate {
	async create(
		name: string,
		sex: SexEnum,
		section_id: string,
		state_id: string
	): Promise<RestApi.ObjectResInterface> {
		try {
			const result = await SchoolModel.create({ name, sex, section_id, state_id }, { isNewRecord: true });

			return {
				is_success: !!result,
				data: result
			};
		} catch (error) {
			AppLogger.error('Error in SchoolCreate create', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}
}
