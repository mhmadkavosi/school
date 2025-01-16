import { AppLogger } from '../../../../lib/logger/Logger';
import PreparationModel from '../../models/preparation.model';
import PreparationPlanModel from '../../models/preparation_plan.model';

export class PreparationInfo {
	async get_by_preparation_year(
		start: string,
		end: string,
		class_level_id: string
	): Promise<RestApi.ObjectResInterface> {
		try {
			const match: any = [{}];

			if (class_level_id) {
				match.push({ class_level_id });
			}

			if (start) {
				match.push({ preparation_year_start: start });
			}

			if (end) {
				match.push({ preparation_year_end: end });
			}
			const result = await PreparationModel.findAll({
				where: match,
				include: [
					{
						model: PreparationPlanModel
					}
				]
			});

			return {
				is_success: !!result,
				data: result
			};
		} catch (error) {
			AppLogger.error('Error in PreparationInfo get_by_preparation_year', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}
}
