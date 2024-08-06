import { AppLogger } from '../../../../lib/logger/Logger';
import SchoolModel from '../../models/school.model';
import { SexEnum } from '../../models/enums/sex.enum';

export class SchoolCreate {
	async create(name: string, sex: SexEnum): Promise<RestApi.ObjectResInterface> {
		try {
			const result = await SchoolModel.create({ name, sex }, { isNewRecord: true });

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
