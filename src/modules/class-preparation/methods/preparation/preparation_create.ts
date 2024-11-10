import { AppLogger } from '../../../../lib/logger/Logger';
import PreparationModel from '../../models/preparation.model';
import { PreparationBuilder } from './preparation.builder';

export class PreparationCreate {
	async create(builder: PreparationBuilder): Promise<RestApi.ObjectResInterface> {
		try {
			const result = await PreparationModel.create(
				{
					preparation_year_start: builder.getPreparationYearStart(),
					preparation_year_end: builder.getPreparationYearEnd(),
					subject: builder.getSubject(),
					class_level_id: builder.getClassLevelId(),
					grade: builder.getGrade(),
					semester: builder.getSemester(),
					part: builder.getPart(),
					notes: builder.getNotes(),
					season: builder.getSeason()
				},
				{ isNewRecord: true }
			);

			return {
				is_success: !!result,
				data: result
			};
		} catch (error) {
			AppLogger.error('Error in PreparationCreate create', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}
}
