import { AppLogger } from '../../../../lib/logger/Logger';
import HomeWorkModel from '../../models/home_work.model';
import { HomeWorkBuilder } from './home_work.builder';

export class HomeWorkCreate {
	async create(builder: HomeWorkBuilder): Promise<RestApi.ObjectResInterface> {
		try {
			const result = await HomeWorkModel.create(
				{
					title: builder.getTitle(),
					start_date: builder.getStartDate(),
					end_date: builder.getEndDate(),
					description: builder.getDescription(),
					max_score: builder.getMaxScore(),
					min_score: builder.getMinScore(),
					teacher_id: builder.getTeacherId()
				},
				{ isNewRecord: true }
			);

			return {
				is_success: !!result,
				data: result
			};
		} catch (error) {
			AppLogger.error('Error in HomeWorkCreate create', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}
}
