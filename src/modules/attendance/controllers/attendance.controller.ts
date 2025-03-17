import { Request, Response } from 'express';
import Validator from 'validatorjs';
import { PreconditionFailedError } from '../../../lib/http/error/precondition_failed.error';
import { AttendanceTypeEnum } from '../models/enums/attendance_type.enum';
import { AttendanceBuilder } from '../methods/attendance/attendance.builder';
import { ApiRes } from '../../../lib/http/api_response';
import { AttendanceUpdate } from '../methods/attendance/attendance_update';
import { AttendanceInfo } from '../methods/attendance/attendance_info';
export const create = async (req: Request, res: Response) => {
	const validate = new Validator(
		{
			date: req.body.date,
			student_id: req.body.student_id,
			class_id: req.body.class_id,
			attendance_reason_id: req.body.attendance_reason_id,
			attendance_type: req.body.attendance_type,
			time_of_delayed: req.body.time_of_delayed
		},
		{
			date: ['required', 'date'],
			student_id: ['required', 'string'],
			class_id: ['required', 'string'],
			attendance_reason_id: ['string'],
			attendance_type: ['required', 'string', { in: Object.keys(AttendanceTypeEnum) }],
			time_of_delayed: ['numeric']
		}
	);

	if (validate.fails()) {
		return new PreconditionFailedError(res, validate.errors.all());
	}

	const result = await new AttendanceBuilder()
		.setDate(req.body.date)
		.setStudentId(req.body.student_id)
		.setClassId(req.body.class_id)
		.setAttendanceReasonId(req.body.attendance_reason_id)
		.setAttendanceType(req.body.attendance_type)
		.setTimeOfDelayed(req.body.time_of_delayed)
		.build();

	return ApiRes(res, {
		status: result.is_success ? 200 : 500,
		data: result.data
	});
};

export const add_reason = async (req: Request, res: Response) => {
	const validate = new Validator(
		{
			attendance_id: req.body.attendance_id,
			attendance_reason_id: req.body.attendance_reason_id
		},
		{
			attendance_id: ['required', 'string'],
			attendance_reason_id: ['required', 'string']
		}
	);

	if (validate.fails()) {
		return new PreconditionFailedError(res, validate.errors.all());
	}

	const result = await new AttendanceUpdate().add_reason(
		req.body.attendance_id,
		req.body.attendance_reason_id
	);

	return ApiRes(res, {
		status: result.is_success ? 200 : 500,
		data: result.data
	});
};

export const add_delay_time = async (req: Request, res: Response) => {
	const validate = new Validator(
		{
			attendance_id: req.body.attendance_id,
			time_of_delayed: req.body.time_of_delayed
		},
		{
			attendance_id: ['required', 'string'],
			time_of_delayed: ['required', 'numeric']
		}
	);

	if (validate.fails()) {
		return new PreconditionFailedError(res, validate.errors.all());
	}

	const result = await new AttendanceUpdate().add_delay_time(
		req.body.attendance_id,
		req.body.time_of_delayed
	);

	return ApiRes(res, {
		status: result.is_success ? 200 : 500,
		data: result.data
	});
};
export const update_attendance_type = async (req: Request, res: Response) => {
	const validate = new Validator(
		{
			attendance_id: req.body.attendance_id,
			attendance_type: req.body.attendance_type
		},
		{
			attendance_id: ['required', 'string'],
			attendance_type: ['required', 'string', { in: Object.keys(AttendanceTypeEnum) }]
		}
	);

	if (validate.fails()) {
		return new PreconditionFailedError(res, validate.errors.all());
	}

	const result = await new AttendanceUpdate().update_attendance_type(
		req.body.attendance_id,
		req.body.attendance_type
	);

	return ApiRes(res, {
		status: result.is_success ? 200 : 500,
		data: result.data
	});
};

export const get_all = async (req: Request, res: Response) => {
	const validate = new Validator(
		{
			page: req.query.page,
			limit: req.query.limit,
			class_id: req.query.class_id,
			start_date: req.query.start_date,
			end_date: req.query.end_date,
			attendance_type: req.query.attendance_type,
			student_id: req.query.student_id
		},
		{
			page: ['required', 'numeric'],
			limit: ['required', 'numeric'],
			class_id: ['string'],
			start_date: ['string'],
			end_date: ['string'],
			attendance_type: ['string', { in: Object.keys(AttendanceTypeEnum) }],
			student_id: ['string']
		}
	);

	if (validate.fails()) {
		return new PreconditionFailedError(res, validate.errors.all());
	}
	const result = await new AttendanceInfo().get_all(
		Number(req.query.page),
		Number(req.query.limit),
		<string>req.query.class_id,
		<string>req.query.start_date,
		<string>req.query.end_date,
		<string>req.query.attendance_type,
		<string>req.query.student_id,
		req.user_id
	);

	return ApiRes(res, {
		status: result.is_success ? 200 : 500,
		data: result.data
	});
};

export const get_counts = async (req: Request, res: Response) => {
	const result = await new AttendanceInfo().get_counts_by_class_id(req.params.class_id);

	return ApiRes(res, {
		status: result.is_success ? 200 : 500,
		data: result.data
	});
};
export const get_info = async (req: Request, res: Response) => {
	const result = await new AttendanceInfo().get_info_by_id(req.params.attendance_id);

	return ApiRes(res, {
		status: result.is_success ? 200 : 500,
		data: result.data
	});
};

export const get_by_attendance_type = async (req: Request, res: Response) => {
	const validate = new Validator(
		{
			class_id: req.query.class_id,
			attendance_type: req.query.attendance_type
		},
		{
			class_id: ['required', 'string'],
			attendance_type: ['required', 'string', { in: Object.keys(AttendanceTypeEnum) }]
		}
	);

	if (validate.fails()) {
		return new PreconditionFailedError(res, validate.errors.all());
	}

	const result = await new AttendanceInfo().get_by_attendance_type(
		<string>req.query.class_id,
		<string>req.query.attendance_type
	);

	return ApiRes(res, {
		status: result.is_success ? 200 : 500,
		data: result.data
	});
};

export const get_all_for_student = async (req: Request, res: Response) => {
	const validate = new Validator(
		{
			page: req.query.page,
			limit: req.query.limit,
			start_date: req.query.start_date,
			end_date: req.query.end_date,
			attendance_type: req.query.attendance_type
		},
		{
			page: ['required', 'numeric'],
			limit: ['required', 'numeric'],
			start_date: ['string'],
			end_date: ['string'],
			attendance_type: ['string', { in: Object.keys(AttendanceTypeEnum) }]
		}
	);

	if (validate.fails()) {
		return new PreconditionFailedError(res, validate.errors.all());
	}
	const result = await new AttendanceInfo().get_student_attendance(
		Number(req.query.page),
		Number(req.query.limit),
		req.student_id,
		<string>req.query.start_date,
		<string>req.query.end_date,
		<string>req.query.attendance_type
	);

	return ApiRes(res, {
		status: result.is_success ? 200 : 500,
		data: result.data
	});
};
