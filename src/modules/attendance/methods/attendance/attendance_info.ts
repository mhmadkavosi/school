import { Op, Sequelize } from 'sequelize';
import { AppLogger } from '../../../../lib/logger/Logger';
import AttendanceModel from '../../models/attendance.model';
import { paginate } from '../../../../utils/paginate.utility';
import StudentModel from '../../../student/models/student.model';
import AttendanceReasonModel from '../../models/attendance_reason.model';
import ClassesModel from '../../../school_class/models/classes.model';
import { AttendanceTypeEnum } from '../../models/enums/attendance_type.enum';
import { WeekDays } from '../../../school_class/models/enums/week_days.enum';
import ClassTimingModel from '../../../school_class/models/class_timing.mode';

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

	async get_student_attendance(
		page: number,
		limit: number,
		student_id: string,
		start_date: string,
		end_date: string,
		attendance_type: string
	): Promise<RestApi.ObjectResInterface> {
		try {
			const match: any = [];
			const skip = (page - 1) * limit;

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
					{ model: ClassesModel, attributes: ['name', 'id', 'teacher_id'] }
				],
				limit: limit,
				offset: skip
			});

			return {
				is_success: !!result,
				data: paginate(page, limit, result)
			};
		} catch (error) {
			AppLogger.error('Error in AttendanceInfo get_student_attendance', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}

	async get_counts_by_student_id(
		student_id: string,
		start_date: string,
		end_date: string
	): Promise<RestApi.ObjectResInterface> {
		try {
			// Get the student's class ID
			const student = await StudentModel.findByPk(student_id);
			if (!student) {
				return {
					is_success: false,
					msg: 'Student not found'
				};
			}

			// Format dates properly
			let startDateObj = start_date ? new Date(start_date + 'T00:00:00.000Z') : null;
			const endDateObj = end_date ? new Date(end_date + 'T23:59:00.000Z') : new Date();

			if (!startDateObj) {
				// If no start date is provided, default to student's creation date
				// This assumes students are created when they join the class
				startDateObj = new Date(student.dataValues.created_at);
			}

			// Get the class timings for this student's class
			const classTimings = await ClassTimingModel.findAll({
				where: {
					class_id: student.dataValues.class_id
				}
			});

			// Calculate total scheduled classes from start_date to end_date
			// We need to count how many of each weekday occur in the date range
			const totalClassesCount = calculateTotalClasses(startDateObj, endDateObj, classTimings);

			// Set up date conditions for attendance records
			const dateCondition = {
				date: {
					[Op.gte]: startDateObj,
					[Op.lte]: endDateObj
				}
			};

			// Count absences and delays in the attendance records
			const absenceCount = await AttendanceModel.count({
				where: {
					student_id,
					attendance_type: AttendanceTypeEnum.absence,
					...dateCondition
				}
			});

			const delayCount = await AttendanceModel.count({
				where: {
					student_id,
					attendance_type: AttendanceTypeEnum.delayed,
					...dateCondition
				}
			});

			// Calculate present as total scheduled classes minus absences and delays
			const presentCount = totalClassesCount - absenceCount - delayCount;

			// Format the response
			const formattedResponse = {
				present: presentCount > 0 ? presentCount : 0, // Ensure no negative values
				absent: absenceCount,
				delays: delayCount,
				days: totalClassesCount
			};

			return {
				is_success: true,
				data: formattedResponse
			};
		} catch (error) {
			AppLogger.error('Error in AttendanceInfo get_counts_by_student_id', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}
}

// Helper function to calculate total classes based on class timings
function calculateTotalClasses(startDate: Date, endDate: Date, classTimings: any[]): number {
	let totalClasses = 0;

	// Create a mapping of weekdays to their corresponding index (0-6)
	// Note: This mapping depends on your WeekDays enum definition
	const weekDayMapping: { [key: string]: number } = {
		[WeekDays.sunday]: 0,
		[WeekDays.monday]: 1,
		[WeekDays.tuesday]: 2,
		[WeekDays.wednesday]: 3,
		[WeekDays.thursday]: 4,
		[WeekDays.friday]: 5,
		[WeekDays.saturday]: 6
	};

	// Create a count of classes per day of week
	const classesPerWeekday: { [key: number]: number } = {};
	classTimings.forEach((timing) => {
		const weekdayIndex = weekDayMapping[timing.day];
		classesPerWeekday[weekdayIndex] = (classesPerWeekday[weekdayIndex] || 0) + 1;
	});

	// Loop through each day in the date range
	const currentDate = new Date(startDate);
	while (currentDate <= endDate) {
		const dayOfWeek = currentDate.getDay();
		// Add the number of classes scheduled for this day of week
		totalClasses += classesPerWeekday[dayOfWeek] || 0;

		// Move to next day
		currentDate.setDate(currentDate.getDate() + 1);
	}

	return totalClasses;
}
