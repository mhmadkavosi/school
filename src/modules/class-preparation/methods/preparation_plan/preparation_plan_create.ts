import { AppLogger } from '../../../../lib/logger/Logger';
import PreparationPlanModel from '../../models/preparation_plan.model';
import { PreparationPlanBuilder } from './preparation_plan.builder';

export class PreparationPlanCreate {
	async create(builder: PreparationPlanBuilder): Promise<RestApi.ObjectResInterface> {
		try {
			const result = await PreparationPlanModel.create(
				{
					week_number: builder.getWeekNumber(),
					field: builder.getField(),
					basic_concept: builder.getBasicConcept(),
					number_of_class: builder.getNumberOfClass(),
					preparation_id: builder.getPreparationId(),
					subject: builder.getSubject(),
					season: builder.getSeason()
				},
				{ isNewRecord: true }
			);

			return { is_success: !!result, data: result };
		} catch (error) {
			AppLogger.error('Error in PreparationPlanCreate create', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}
}
