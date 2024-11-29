import { AppLogger } from '../../../../lib/logger/Logger';
import PreparationPlanModel from '../../models/preparation_plan.model';
import { PreparationPlanBuilder } from './preparation_plan.builder';

export class PreparationPlanUpdate {
	async update(builder: PreparationPlanBuilder): Promise<RestApi.ObjectResInterface> {
		try {
			const result = await PreparationPlanModel.update(
				{
					week_number: builder.getWeekNumber(),
					field: builder.getField(),
					basic_concept: builder.getBasicConcept(),
					number_of_class: builder.getNumberOfClass(),
					preparation_id: builder.getPreparationId(),
					subject: builder.getSubject(),
					notes: builder.getNotes(),
					season: builder.getSeason()
				},
				{ where: { id: builder.getId() } }
			);

			return { is_success: !!result, data: result };
		} catch (error) {
			AppLogger.error('Error in PreparationPlanUpdate update', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}
}
