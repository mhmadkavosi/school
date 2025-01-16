import { Op, Sequelize } from 'sequelize';
import { AppLogger } from '../../../../lib/logger/Logger';
import AttendanceModel from '../../models/attendance.model';
import { paginate } from '../../../../utils/paginate.utility';
import StudentModel from '../../../student/models/student.model';
import AttendanceReasonModel from '../../models/attendance_reason.model';
import ClassesModel from '../../../school_class/models/classes.model';

export class AttendanceInfo {
	async get_all(
		page: number,
		limit: number,
		class_id: string,
		start_date: string,
		end_date: string,
		attendance_type: string,
		student_id: string,
		teacher_id: string
	): Promise<RestApi.ObjectResInterface> {
		try {
			const skip = (page - 1) * limit;
			const match: any = [];

			if (!!class_id) {
				match.push({
					class_id
				});
			}

			if (!!student_id) {
				match.push({
					student_id
				});
			}

			if (start_date && end_date) {
				match.push({
					date: {
						[Op.gte]: new Date(start_date + 'T' + '00:00:00' + '.000Z'),
						[Op.lte]: new Date(end_date + 'T' + '23:59:00' + '.000Z')
					}
				});
			} else if (start_date) {
				match.push({
					date: {
						[Op.gte]: new Date(start_date + 'T' + '00:00:00' + '.000Z'),
						[Op.lte]: new Date(start_date + 'T' + '23:59:00' + '.000Z')
					}
				});
			} else if (end_date) {
				match.push({
					date: {
						[Op.gte]: new Date(end_date + 'T' + '00:00:00' + '.000Z'),
						[Op.lte]: new Date(end_date + 'T' + '23:59:00' + '.000Z')
					}
				});
			}

			if (!!attendance_type) {
				match.push({
					attendance_type
				});
			}

			const result = await AttendanceModel.findAndCountAll({
				where: { [Op.and]: match },
				distinct: true,
				include: [
					{ model: AttendanceReasonModel },
					{ model: ClassesModel, where: { teacher_id }, attributes: ['name', 'id', 'teacher_id'] }
				],
				limit: limit,
				offset: skip
			});

			return {
				is_success: !!result,
				data: paginate(page, limit, result)
			};
		} catch (error) {
			AppLogger.error('Error in AttendanceInfo get_all', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}

	async get_counts_by_class_id(class_id: string): Promise<RestApi.ObjectResInterface> {
		try {
			const result = await AttendanceModel.findAll({
				where: { class_id },
				attributes: ['attendance_type', [Sequelize.fn('COUNT', 'id'), 'count']],
				group: ['attendance_type']
			});
			return {
				is_success: !!result,
				data: result
			};
		} catch (error) {
			AppLogger.error('Error in AttendanceInfo get_counts_by_class_id', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}

	async get_info_by_id(id: string): Promise<RestApi.ObjectResInterface> {
		try {
			const result = await AttendanceModel.findOne({
				where: { id },
				include: [{ model: AttendanceReasonModel }]
			});

			return {
				is_success: !!result,
				data: result
			};
		} catch (error) {
			AppLogger.error('Error in AttendanceInfo get_info_by_id', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}

	async get_by_attendance_type(
		class_id: string,
		attendance_type: string
	): Promise<RestApi.ObjectResInterface> {
		try {
			const result = await AttendanceModel.findAll({
				where: { class_id, attendance_type },
				include: [
					{
						model: StudentModel,
						attributes: ['id', 'name', 'family']
					}
				]
			});

			return {
				is_success: !!result,
				data: result
			};
		} catch (error) {
			AppLogger.error('Error in AttendanceInfo get_by_attendance_type', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}
}
