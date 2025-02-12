import { Response, Request } from 'express';
import Validator from 'validatorjs';
import { PreconditionFailedError } from '../../../../lib/http/error/precondition_failed.error';

import { ApiRes } from '../../../../lib/http/api_response';
import { HttpStatus } from '../../../../lib/http/http_status';
import { NotificationStatusEnum } from '../../models/enums/notification_status.enum';
import { NotificationBuilder } from '../../methods/notification_assign/notification.builder';
import { NotificationAssignCreate } from '../../methods/notification/notification_assign_create';
import { NotificationUpdate } from '../../methods/notification_assign/notification_update';
import { NotificationDestroy } from '../../methods/notification_assign/notification_destroy';
import { NotificationInfo } from '../../methods/notification_assign/notification_info';

export const notification_create = async (req: Request, res: Response) => {
	const validate = new Validator(
		{
			title: req.body.title,
			status: req.body.status,
			type: req.body.type,
			details: req.body.details,
			assigns: req.body.assigns
		},
		{
			title: ['required', 'string'],
			status: [
				'required',
				'string',
				{ in: [NotificationStatusEnum.important, NotificationStatusEnum.low, NotificationStatusEnum.normal] }
			],
			type: ['required', 'string'],
			details: ['string'],
			assigns: ['required', 'array'],
			'assigns.*.assign_id': ['required', 'string'],
			'assigns.*.assign_type': ['required', 'string', { in: ['teacher', 'class', 'student'] }]
		}
	);

	if (validate.fails()) {
		return new PreconditionFailedError(res, validate.errors.all());
	}

	const notificationResult = await new NotificationBuilder()
		.setTitle(req.body.title)
		.setStatus(req.body.status)
		.setType(req.body.type)
		.setDetails(req.body.details || '')
		.build();

	if (!notificationResult.is_success) {
		return ApiRes(res, {
			status: HttpStatus.INTERNAL_SERVER_ERROR,
			msg: 'Failed to create notification'
		});
	}

	const assignResults = [];

	for (const assign of req.body.assigns) {
		const assignResult = await new NotificationAssignCreate().create(
			notificationResult.data.id,
			assign.assign_id,
			assign.assign_type
		);
		assignResults.push(assignResult);
	}

	return ApiRes(res, {
		status: HttpStatus.OK,
		data: {
			notification: notificationResult.data,
			assigns: assignResults.map((result) => result.data)
		}
	});
};

export const notification_update = async (req: Request, res: Response) => {
	const validate = new Validator(
		{
			id: req.body.id,
			title: req.body.title,
			status: req.body.status,
			type: req.body.type,
			details: req.body.details
		},
		{
			id: ['required', 'string'],
			title: ['string'],
			status: [
				'string',
				{ in: [NotificationStatusEnum.important, NotificationStatusEnum.low, NotificationStatusEnum.normal] }
			],
			type: ['string'],
			details: ['string']
		}
	);

	if (validate.fails()) {
		return new PreconditionFailedError(res, validate.errors.all());
	}

	const result = await new NotificationUpdate().update(
		req.body.id,
		req.body.title,
		req.body.status,
		req.body.type,
		req.body.details
	);

	if (!result.is_success) {
		return ApiRes(res, {
			status: HttpStatus.NOT_FOUND
		});
	}

	return ApiRes(res, {
		status: HttpStatus.OK,
		data: result.data
	});
};

export const notification_destroy = async (req: Request, res: Response) => {
	const validate = new Validator(
		{
			id: req.body.id
		},
		{
			id: ['required', 'string']
		}
	);

	if (validate.fails()) {
		return new PreconditionFailedError(res, validate.errors.all());
	}

	const result = await new NotificationDestroy().destroy(req.body.id);

	return ApiRes(res, {
		status: result.is_success ? HttpStatus.OK : HttpStatus.INTERNAL_SERVER_ERROR
	});
};

export const notification_get_all = async (req: Request, res: Response) => {
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

	const result = await new NotificationInfo().get_all_notifications(
		Number(req.query.page),
		Number(req.query.limit)
	);

	return ApiRes(res, {
		status: HttpStatus.OK,
		data: result.data
	});
};

export const get_total = async (req: Request, res: Response) => {
	const result = await new NotificationInfo().get_total_notification();

	return ApiRes(res, {
		status: HttpStatus.OK,
		data: result.data
	});
};

export const get_total_by_category = async (req: Request, res: Response) => {
	const result = await new NotificationInfo().get_total_by_school_level();

	return ApiRes(res, {
		status: HttpStatus.OK,
		data: result.data
	});
};
