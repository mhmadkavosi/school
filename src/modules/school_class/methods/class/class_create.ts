import { ClassBuilder } from './class.builder';
import ClassesModel from '../../models/classes.model';
import { AppLogger } from '../../../../lib/logger/Logger';

export class ClassCreate {
	async create(builder: ClassBuilder): Promise<RestApi.ObjectResInterface> {
		try {
			const result = await ClassesModel.create(
				{
					school_id: builder.getSchoolId(),
					class_level_id: builder.getClassLevelId(),
					count: builder.getCount(),
					link: builder.getLink(),
					teacher_id: builder.getTeacherId(),
					name: builder.getName()
				},
				{ isNewRecord: true }
			);

			return {
				is_success: !!result,
				data: result
			};
		} catch (error) {
			AppLogger.error('Error in ClassCreate create', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}
}
