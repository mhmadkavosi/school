import { AppLogger } from '../../../../lib/logger/Logger';
import TeacherModel from '../../models/teacher.model';

export class TeacherCreate {
	async create(email: string, name: string, family: string): Promise<RestApi.ObjectResInterface> {
		try {
			const result = await TeacherModel.create({ email, name, family });

			return {
				is_success: !!result,
				data: result
			};
		} catch (error) {
			AppLogger.error('Error in TeacherCreate create', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}
}
