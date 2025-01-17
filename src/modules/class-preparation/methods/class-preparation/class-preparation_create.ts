import { AppLogger } from '../../../../lib/logger/Logger';
import ClassPreparationModel from '../../models/classـpreparatoin.model';
import { ClassPreparationBuilder } from './class_preparation.builder';

export class ClassPreparationCreate {
	async create(builder: ClassPreparationBuilder): Promise<RestApi.ObjectResInterface> {
		try {
			const result = await ClassPreparationModel.create(
				{
					date: builder.getDate(),
					preparation_id: builder.getPreparationId(),
					teacher_id: builder.getTeacherId(),
					subject: builder.getSubject()
				},
				{ isNewRecord: true }
			);

			return {
				is_success: !!result,
				data: result
			};
		} catch (error) {
			AppLogger.error('Error in ClassPreparationCreate create', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}
}
