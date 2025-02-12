import { AppLogger } from '../../../../lib/logger/Logger';
import { paginate } from '../../../../utils/paginate.utility';
import { NotificationAssignTypeEnum } from '../../models/enums/notification_assign_type.enum';
import NotificationModel from '../../models/notification.model';
import NotificationAssignModel from '../../models/notification_assign.model';

export class NotificationInfo {
	// Get all notifications with pagination
	async get_all_notifications(page: number, limit: number): Promise<RestApi.ObjectResInterface> {
		try {
			const skip = (page - 1) * limit;

			const result = await NotificationModel.findAndCountAll({
				distinct: true,
				limit: limit,
				offset: skip,
				order: [['created_at', 'DESC']],
				include: [{ model: NotificationAssignModel }]
			});

			return {
				is_success: true,
				data: paginate(page, limit, result)
			};
		} catch (error) {
			AppLogger.error('Error in NotificationInfo get_all_notifications', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}

	// Get notifications by student ID
	async get_notifications_by_student_id(
		student_id: string,
		page: number,
		limit: number
	): Promise<RestApi.ObjectResInterface> {
		try {
			const skip = (page - 1) * limit;

			const result = await NotificationModel.findAndCountAll({
				distinct: true,
				limit: limit,
				offset: skip,
				order: [['created_at', 'DESC']],
				include: [
					{
						model: NotificationAssignModel,
						where: {
							assign_id: student_id,
							assign_type: NotificationAssignTypeEnum.student
						}
					}
				]
			});

			return {
				is_success: true,
				data: paginate(page, limit, result)
			};
		} catch (error) {
			AppLogger.error('Error in NotificationInfo get_notifications_by_student_id', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}

	// Get notifications by teacher ID
	async get_notifications_by_teacher_id(
		teacher_id: string,
		page: number,
		limit: number
	): Promise<RestApi.ObjectResInterface> {
		try {
			const skip = (page - 1) * limit;

			const result = await NotificationModel.findAndCountAll({
				distinct: true,
				limit: limit,
				offset: skip,
				order: [['created_at', 'DESC']],
				include: [
					{
						model: NotificationAssignModel,
						where: {
							assign_id: teacher_id,
							assign_type: NotificationAssignTypeEnum.teacher
						}
					}
				]
			});

			return {
				is_success: true,
				data: paginate(page, limit, result)
			};
		} catch (error) {
			AppLogger.error('Error in NotificationInfo get_notifications_by_teacher_id', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}

	// Get notifications by class ID
	async get_notifications_by_class_id(
		class_id: string,
		page: number,
		limit: number
	): Promise<RestApi.ObjectResInterface> {
		try {
			const skip = (page - 1) * limit;

			const result = await NotificationModel.findAndCountAll({
				distinct: true,
				limit: limit,
				offset: skip,
				order: [['created_at', 'DESC']],
				include: [
					{
						model: NotificationAssignModel,
						where: {
							assign_id: class_id,
							assign_type: NotificationAssignTypeEnum.class
						}
					}
				]
			});

			return {
				is_success: true,
				data: paginate(page, limit, result)
			};
		} catch (error) {
			AppLogger.error('Error in NotificationInfo get_notifications_by_class_id', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}

	async get_total_notification(): Promise<RestApi.ObjectResInterface> {
		try {
			const total_notification = await NotificationModel.count();
			return {
				is_success: true,
				data: total_notification
			};
		} catch (error) {
			AppLogger.error('Error in NotificationInfo get_total_notification', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}

	async get_total_by_school_level(): Promise<RestApi.ObjectResInterface> {
		try {
			const totals = await NotificationModel.count({
				group: ['type'],
				attributes: ['type']
			});

			return {
				is_success: true,
				data: totals
			};
		} catch (error) {
			AppLogger.error('Error in NotificationAdminInfo get_total_by_school_level', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}
}
