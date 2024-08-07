import { AppLogger } from '../../../lib/logger/Logger';
import { SexEnum } from '../models/enums/sex.enum';
import SchoolModel from '../models/school.model';

export class SchoolUpdate {
	async update(id: string, name: string, sex: SexEnum): Promise<RestApi.ObjectResInterface> {
		try {
			const result = await SchoolModel.update({ name, sex }, { where: { id } });

			return {
				is_success: result[0] > 0
			};
		} catch (error) {
			AppLogger.error('Error in SchoolUpdate update', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}
}
