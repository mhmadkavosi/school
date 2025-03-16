import { Op } from 'sequelize';
import { AppLogger } from '../../../../lib/logger/Logger';
import { paginate } from '../../../../utils/paginate.utility';
import EventCategoryModel from '../../models/event_category.model';
import ScheduleModel from '../../models/schedule.model';
import ScheduleAssignModel from '../../models/schedule_assign.model';
import { AssignToTargetEnum } from '../../models/enums/assign_to_target.enum';

export class ScheduleInfo {
	async get_all_schedule_by_teacher_id(
		page: number,
		limit: number,
		teacher_id: string,
		start_date: string,
		end_date: string,
		event_type: string,
		event_category_id: string,
		class_id: string,
		student_id: string
	): Promise<RestApi.ObjectResInterface> {
		try {
			const skip = (page - 1) * limit;
			const match: any = [{ teacher_id }];

			if (start_date && end_date) {
				match.push({
					event_date: {
						[Op.gte]: new Date(start_date + 'T' + '00:00:00' + '.000Z'),
						[Op.lte]: new Date(end_date + 'T' + '23:59:00' + '.000Z')
					}
				});
			} else if (start_date) {
				match.push({
					event_date: {
						[Op.gte]: new Date(start_date + 'T' + '00:00:00' + '.000Z'),
						[Op.lte]: new Date(start_date + 'T' + '23:59:00' + '.000Z')
					}
				});
			} else if (end_date) {
				match.push({
					event_date: {
						[Op.gte]: new Date(end_date + 'T' + '00:00:00' + '.000Z'),
						[Op.lte]: new Date(end_date + 'T' + '23:59:00' + '.000Z')
					}
				});
			}

			if (event_type) {
				match.push({
					event_type
				});
			}

			if (event_category_id) {
				match.push({
					event_category_id
				});
			}

			const class_match: any = [];
			if (class_id) {
				class_match.push({
					assign_to_target: AssignToTargetEnum.class,
					assign_to: class_id
				});
			}
			if (!!student_id) {
				class_match.push({
					assign_to_target: AssignToTargetEnum.student,
					assign_to: student_id
				});
			}

			const result = await ScheduleModel.findAndCountAll({
				where: { [Op.and]: match },
				distinct: true,
				limit: limit,
				offset: skip,
				include: [
					{
						model: EventCategoryModel,
						required: false
					},
					{
						model: ScheduleAssignModel,
						where: { [Op.and]: class_match },
						required: false
					}
				]
			});

			return {
				is_success: !!result,
				data: paginate(page, limit, result)
			};
		} catch (error) {
			AppLogger.error('Error in ScheduleInfo get_all_schedule_by_teacher_id', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}

	async get_by_id(id: string): Promise<RestApi.ObjectResInterface> {
		try {
			const result = await ScheduleModel.findOne({
				where: { id },
				include: [{ model: EventCategoryModel }, { model: ScheduleAssignModel }]
			});

			return {
				is_success: !!result,
				data: result
			};
		} catch (error) {
			AppLogger.error('Error in ScheduleInfo get_by_id', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}
	async get_schedules_for_student(
		student_id: string,
		student_class_id: string
	): Promise<RestApi.ObjectResInterface> {
		try {
			const result = await ScheduleModel.findAll({
				include: [
					{ model: EventCategoryModel },
					{
						model: ScheduleAssignModel,
						where: {
							[Op.or]: [
								// Schedules assigned directly to this student
								{
									assign_to: student_id,
									assign_to_target: AssignToTargetEnum.student
								},
								// Schedules assigned to any class this student belongs to
								{
									assign_to: student_class_id,
									assign_to_target: AssignToTargetEnum.class
								}
							]
						}
					}
				],
				order: [['event_date', 'ASC']] // Optional: order by date
			});

			return {
				is_success: true,
				data: result
			};
		} catch (error) {
			AppLogger.error('Error in ScheduleInfo get_schedules_for_student', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}
}
