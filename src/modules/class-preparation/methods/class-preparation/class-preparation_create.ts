import { AppLogger } from '../../../../lib/logger/Logger';
import ClassPreparationModel from '../../models/classـpreparatoin.model';
import { ClassPreparationBuilder } from './class_preparation.builder';

export class ClassPreparationCreate {
	async create(builder: ClassPreparationBuilder): Promise<RestApi.ObjectResInterface> {
		try {
			const result = await ClassPreparationModel.create(
				{
					date: builder.getDate(),
					subject: builder.getSubject(),
					knowledge_objectives: builder.getKnowledgeObjectives(),
					skill_objectives: builder.getSkillObjectives(),
					emotional_objectives: builder.getEmotionalObjectives(),
					teaching_aids: builder.getTeachingAids(),
					acquired_skills: builder.getAcquiredSkills(),
					present: builder.getPresent(),
					apply: builder.getApply(),
					value_and_expand: builder.getValueAndExpand(),
					teacher_id: builder.getTeacherId()
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
