import { AppLogger } from '../../../../lib/logger/Logger';
import ClassPreparationModel from '../../models/classـpreparatoin.model';

export class ClassPreparationUpdate {
	async update(
		id: string,
		date: Date,
		preparation_id: string,
		knowledge_objectives: string,
		skill_objectives: string,
		emotional_objectives: string,
		teaching_aids: string,
		acquired_skills: string,
		present: string,
		apply: string,
		value_and_expand: string,
		teacher_id: string
	): Promise<RestApi.ObjectResInterface> {
		try {
			const result = await ClassPreparationModel.update(
				{
					date,
					preparation_id,
					knowledge_objectives,
					skill_objectives,
					emotional_objectives,
					teaching_aids,
					acquired_skills,
					present,
					apply,
					value_and_expand
				},
				{
					where: { id, teacher_id }
				}
			);

			return {
				is_success: result[0] > 0
			};
		} catch (error) {
			AppLogger.error('Error in ClassPreparationUpdate update', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}

	async add_objectives(
		id: string,
		knowledge_objectives: string,
		skill_objectives: string,
		emotional_objectives: string,
		teacher_id: string
	): Promise<RestApi.ObjectResInterface> {
		try {
			const result = await ClassPreparationModel.update(
				{
					knowledge_objectives,
					skill_objectives,
					emotional_objectives
				},
				{
					where: { id, teacher_id }
				}
			);

			return {
				is_success: result[0] > 0
			};
		} catch (error) {
			AppLogger.error('Error in ClassPreparationUpdate add_objectives', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}
	async add_skills(
		id: string,
		teaching_aids: string,
		acquired_skills: string,
		teacher_id: string
	): Promise<RestApi.ObjectResInterface> {
		try {
			const result = await ClassPreparationModel.update(
				{
					teaching_aids,
					acquired_skills
				},
				{
					where: { id, teacher_id }
				}
			);

			return {
				is_success: result[0] > 0
			};
		} catch (error) {
			AppLogger.error('Error in ClassPreparationUpdate add_skills', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}

	async add_apply(
		id: string,
		present: string,
		apply: string,
		value_and_expand: string,
		teacher_id: string
	): Promise<RestApi.ObjectResInterface> {
		try {
			const result = await ClassPreparationModel.update(
				{
					present,
					apply,
					value_and_expand
				},
				{
					where: { id, teacher_id }
				}
			);

			return {
				is_success: result[0] > 0
			};
		} catch (error) {
			AppLogger.error('Error in ClassPreparationUpdate add_apply', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}

	async update_is_confirm(
		id: string,
		is_confirm: boolean,
		teacher_id: string
	): Promise<RestApi.ObjectResInterface> {
		try {
			const result = await ClassPreparationModel.update(
				{
					is_confirm
				},
				{
					where: { id, teacher_id }
				}
			);

			return {
				is_success: result[0] > 0
			};
		} catch (error) {
			AppLogger.error('Error in ClassPreparationUpdate add_apply', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}
}
