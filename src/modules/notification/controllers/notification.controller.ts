import { Response, Request } from 'express';
import Validator from 'validatorjs';
import { PreconditionFailedError } from '../../../lib/http/error/precondition_failed.error';

import { ApiRes } from '../../../lib/http/api_response';
import { HttpStatus } from '../../../lib/http/http_status';
import { NotificationInfo } from '../methods/notification_assign/notification_info';

export const notification_get_by_class = async (req: Request, res: Response) => {
	const validate = new Validator(
		{
			class_id: req.params.class_id,
			page: req.query.page,
			limit: req.query.limit
		},
		{
			class_id: ['required', 'string'],
			page: ['required', 'integer'],
			limit: ['required', 'integer']
		}
	);

	if (validate.fails()) {
		return new PreconditionFailedError(res, validate.errors.all());
	}

	const result = await new NotificationInfo().get_notifications_by_class_id(
		req.params.class_id,
		Number(req.query.page),
		Number(req.query.limit)
	);

	return ApiRes(res, {
		status: HttpStatus.OK,
		data: result.data
	});
};

// Get notifications by teacher id controller
export const notification_get_by_teacher = async (req: Request, res: Response) => {
	const validate = new Validator(
		{
			page: req.query.page,
			limit: req.query.limit
		},
		{
			page: ['required', 'integer'],
			limit: ['required', 'integer']
		}
	);

	if (validate.fails()) {
		return new PreconditionFailedError(res, validate.errors.all());
	}

	const result = await new NotificationInfo().get_notifications_by_teacher_id(
		req.user_id,
		Number(req.query.page),
		Number(req.query.limit)
	);

	return ApiRes(res, {
		status: HttpStatus.OK,
		data: result.data
	});
};

// Get notifications by student id controller
export const notification_get_by_student = async (req: Request, res: Response) => {
	const validate = new Validator(
		{
			student_id: req.params.student_id,
			page: req.query.page,
			limit: req.query.limit
		},
		{
			student_id: ['required', 'string'],
			page: ['required', 'integer'],
			limit: ['required', 'integer']
		}
	);

	if (validate.fails()) {
		return new PreconditionFailedError(res, validate.errors.all());
	}

	const result = await new NotificationInfo().get_notifications_by_student_id(
		req.params.student_id,
		Number(req.query.page),
		Number(req.query.limit)
	);

	return ApiRes(res, {
		status: HttpStatus.OK,
		data: result.data
	});
};
