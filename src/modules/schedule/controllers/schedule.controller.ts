import { Response, Request } from 'express';
import { PreconditionFailedError } from '../../../lib/http/error/precondition_failed.error';
import Validator from 'validatorjs';
import { AssignToTargetEnum } from '../models/enums/assign_to_target.enum';
import { EventTypes } from '../models/enums/event_type.enum';
import { ScheduleBuilder } from '../methods/schedule/schedule.builder';
import { ApiRes } from '../../../lib/http/api_response';
import { HttpStatus } from '../../../lib/http/http_status';
import { ScheduleUpdate } from '../methods/schedule/schedule_update';
import { ScheduleAssignCreate } from '../methods/schedule_assign/schedule_assign_create';
import { InternalServerError } from '../../../lib/http/error/internal_server.error';
import { ScheduleAssignDestroy } from '../methods/schedule_assign/schedule_assign_delete';
import { ScheduleDestroy } from '../methods/schedule/schedule_destroy';
import { ScheduleInfo } from '../methods/schedule/schedule_info';
import { StudentInfo } from '../../student/methods/student_info';
import { ClassInfo } from '../../school_class/methods/class/class_info';

export const create = async (req: Request, res: Response) => {
	const validate = new Validator(
		{
			title: req.body.title,
			event_date: req.body.event_date,
			event_start_hour: req.body.event_start_hour,
			event_end_hour: req.body.event_end_hour,
			event_description: req.body.event_description,
			assign_to: req.body.assign_to,
			event_category_id: req.body.event_category_id,
			event_type: req.body.event_type,
			school_id: req.body.school_id
		},
		{
			title: ['required', 'string'],
			event_date: ['required', 'date'],
			event_start_hour: ['string'],
			event_end_hour: ['string'],
			event_description: ['string'],
			assign_to: ['array'],
			event_category_id: ['required', 'string'],
			event_type: ['required', { in: Object.keys(EventTypes) }],
			school_id: ['required', 'string']
		}
	);

	if (validate.fails()) {
		return new PreconditionFailedError(res, validate.errors.all());
	}

	const result = await new ScheduleBuilder()
		.setTitle(req.body.title)
		.setEventDate(req.body.event_date)
		.setEventStartHour(req.body.event_start_hour)
		.setEventEndHour(req.body.event_end_hour)
		.setEventDescription(req.body.event_description)
		.setEventCategoryId(req.body.event_category_id)
		.setEventType(req.body.event_type)
		.setTeacherId(req.user_id)
		.setSchoolId(req.body.school_id)
		.build();

	if (!result.is_success) {
		return new InternalServerError(res);
	}

	if (req.body.assign_to && req.body.assign_to.length > 0) {
		for (let i = 0; i < req.body.assign_to.length; i++) {
			const validate = new Validator(
				{
					assign_to_id: req.body.assign_to[i].assign_to_id,
					assign_to_target: req.body.assign_to[i].assign_to_target
				},
				{
					assign_to_id: ['required', 'string'],
					assign_to_target: ['required', { in: Object.keys(AssignToTargetEnum) }]
				}
			);

			if (validate.fails()) {
				return new PreconditionFailedError(res, validate.errors.all());
			}

			const schedule_assign = await new ScheduleAssignCreate().create(
				req.body.assign_to[i].assign_to_id,
				req.body.assign_to[i].assign_to_target,
				result.data.id
			);

			if (!schedule_assign.is_success) {
				return new InternalServerError(res);
			}
		}
	}

	return ApiRes(res, {
		status: result.is_success ? HttpStatus.OK : HttpStatus.INTERNAL_SERVER_ERROR,
		data: result.data
	});
};

export const update = async (req: Request, res: Response) => {
	const validate = new Validator(
		{
			schedule_id: req.body.schedule_id,
			title: req.body.title,
			event_date: req.body.event_date,
			event_start_hour: req.body.event_start_hour,
			event_end_hour: req.body.event_end_hour,
			event_description: req.body.event_description,
			event_category_id: req.body.event_category_id,
			event_type: req.body.event_type
		},
		{
			schedule_id: ['required', 'string'],
			title: ['string'],
			event_date: ['date'],
			event_start_hour: ['string'],
			event_end_hour: ['string'],
			event_description: ['string'],
			event_category_id: ['string'],
			event_type: [{ in: Object.keys(EventTypes) }]
		}
	);

	if (validate.fails()) {
		return new PreconditionFailedError(res, validate.errors.all());
	}

	const result = await new ScheduleUpdate().update(
		req.body.schedule_id,
		req.body.title,
		req.body.event_date,
		req.body.event_start_hour,
		req.body.event_end_hour,
		req.body.event_description,
		req.body.event_category_id,
		req.body.event_type
	);

	return ApiRes(res, {
		status: result.is_success ? HttpStatus.OK : HttpStatus.INTERNAL_SERVER_ERROR
	});
};

export const add_schedule_assign = async (req: Request, res: Response) => {
	const validate = new Validator(
		{
			schedule_id: req.body.schedule_id,
			assign_to: req.body.assign_to
		},
		{
			schedule_id: ['required', 'string'],
			assign_to: ['required', 'array']
		}
	);

	if (validate.fails()) {
		return new PreconditionFailedError(res, validate.errors.all());
	}

	if (req.body.assign_to_id.length > 0) {
		for (let i = 0; i < req.body.assign_to.length; i++) {
			const validate = new Validator(
				{
					assign_to_id: req.body.assign_to[i].assign_to_id,
					assign_to_target: req.body.assign_to[i].assign_to_target
				},
				{
					assign_to_id: ['required', 'string'],
					assign_to_target: ['required', { in: Object.keys(AssignToTargetEnum) }]
				}
			);

			if (validate.fails()) {
				return new PreconditionFailedError(res, validate.errors.all());
			}

			const schedule_assign = await new ScheduleAssignCreate().create(
				req.body.assign_to[i].assign_to_id,
				req.body.assign_to[i].assign_to_target,
				req.body.schedule_id
			);

			if (!schedule_assign.is_success) {
				return new InternalServerError(res);
			}
		}
	}

	return ApiRes(res, {
		status: HttpStatus.OK
	});
};

export const delete_schedule_assign = async (req: Request, res: Response) => {
	const validate = new Validator(
		{
			schedule_id: req.body.schedule_id,
			assign_to_id: req.body.assign_to_id
		},
		{
			schedule_id: ['required', 'string'],
			assign_to_id: ['required', 'string']
		}
	);

	if (validate.fails()) {
		return new PreconditionFailedError(res, validate.errors.all());
	}

	await new ScheduleAssignDestroy().delete(req.body.assign_to_id, req.body.schedule_id);

	return ApiRes(res, {
		status: HttpStatus.OK
	});
};

export const delete_schedule = async (req: Request, res: Response) => {
	const validate = new Validator(
		{
			schedule_id: req.body.schedule_id
		},
		{
			schedule_id: ['required', 'string']
		}
	);

	if (validate.fails()) {
		return new PreconditionFailedError(res, validate.errors.all());
	}

	await new ScheduleAssignDestroy().delete_schedule_id(req.body.schedule_id);
	await new ScheduleDestroy().destroy(req.body.schedule_id);

	return ApiRes(res, {
		status: HttpStatus.OK
	});
};

export const get_all = async (req: Request, res: Response) => {
	const validate = new Validator(
		{
			page: req.query.page,
			limit: req.query.limit,
			start_date: req.query.start_date,
			end_date: req.query.end_date,
			event_type: req.query.event_type,
			event_category_id: req.query.event_category_id,
			class_id: req.query.class_id,
			student_id: req.query.student_id
		},
		{
			page: ['required', 'numeric'],
			limit: ['required', 'numeric'],
			start_date: ['string'],
			end_date: ['string'],
			event_type: ['string', { in: Object.keys(EventTypes) }],
			event_category_id: ['string'],
			class_id: ['string'],
			student_id: ['string']
		}
	);

	if (validate.fails()) {
		return new PreconditionFailedError(res, validate.errors.all());
	}

	const result = await new ScheduleInfo().get_all_schedule_by_teacher_id(
		Number(req.query.page),
		Number(req.query.limit),
		req.user_id,
		<string>req.query.start_date,
		<string>req.query.end_date,
		<string>req.query.event_type,
		<string>req.query.event_category_id,
		<string>req.query.class_id,
		<string>req.query.student_id
	);

	return ApiRes(res, {
		status: HttpStatus.OK,
		data: result.data
	});
};

export const get_by_id = async (req: Request, res: Response) => {
	const result = await new ScheduleInfo().get_by_id(req.params.schedule_id);

	return ApiRes(res, {
		status: result.is_success ? HttpStatus.OK : HttpStatus.INTERNAL_SERVER_ERROR,
		data: result.data
	});
};

export const get_student_schedule = async (req: Request, res: Response) => {
	const student_info = await new StudentInfo().get_by_id(req.student_id);
	const result = await new ScheduleInfo().get_schedules_for_student(
		req.student_id,
		student_info.data.class_id
	);

	return ApiRes(res, {
		status: result.is_success ? HttpStatus.OK : HttpStatus.INTERNAL_SERVER_ERROR,
		data: result.data
	});
};

export const create_student = async (req: Request, res: Response) => {
	const validate = new Validator(
		{
			title: req.body.title,
			event_date: req.body.event_date,
			event_start_hour: req.body.event_start_hour,
			event_end_hour: req.body.event_end_hour,
			event_description: req.body.event_description,

			event_category_id: req.body.event_category_id,
			event_type: req.body.event_type
		},
		{
			title: ['required', 'string'],
			event_date: ['required', 'date'],
			event_start_hour: ['string'],
			event_end_hour: ['string'],
			event_description: ['string'],
			event_category_id: ['required', 'string'],
			event_type: ['required', { in: Object.keys(EventTypes) }]
		}
	);

	if (validate.fails()) {
		return new PreconditionFailedError(res, validate.errors.all());
	}

	const student_info = await new StudentInfo().get_by_id(req.student_id);
	const class_info = await new ClassInfo().get_by_id(student_info.data.class_id);

	const result = await new ScheduleBuilder()
		.setTitle(req.body.title)
		.setEventDate(req.body.event_date)
		.setEventStartHour(req.body.event_start_hour)
		.setEventEndHour(req.body.event_end_hour)
		.setEventDescription(req.body.event_description)
		.setEventCategoryId(req.body.event_category_id)
		.setEventType(req.body.event_type)
		.setTeacherId(class_info.data.classes[0].teacher_id)
		.setSchoolId(class_info.data.classes[0].school_id)
		.build();

	if (!result.is_success) {
		return new InternalServerError(res);
	}

	if (validate.fails()) {
		return new PreconditionFailedError(res, validate.errors.all());
	}

	const schedule_assign = await new ScheduleAssignCreate().create(
		req.student_id,
		AssignToTargetEnum.student,
		result.data.id
	);

	if (!schedule_assign.is_success) {
		return new InternalServerError(res);
	}

	return ApiRes(res, {
		status: result.is_success ? HttpStatus.OK : HttpStatus.INTERNAL_SERVER_ERROR,
		data: result.data
	});
};
