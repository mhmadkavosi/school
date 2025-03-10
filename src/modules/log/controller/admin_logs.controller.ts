import { Request, Response } from 'express';
import Validator from 'validatorjs';
import { PreconditionFailedError } from '../../../lib/http/error/precondition_failed.error';
import { LogTypeEnum } from '../models/enums/log_type.eum';
import { LogsInfo } from '../methods/logs_info';
import { ApiRes } from '../../../lib/http/api_response';
import { HttpStatus } from '../../../lib/http/http_status';
export const get_all = async (req: Request, res: Response) => {
	const validate = new Validator(
		{
			page: req.query.page,
			limit: req.query.limit,
			type: req.query.type,
			start_date: req.query.start_date,
			end_date: req.query.end_date
		},
		{
			page: ['required', 'numeric'],
			limit: ['required', 'numeric'],
			type: ['string', { in: Object.keys(LogTypeEnum) }],
			start_date: ['string'],
			end_date: ['string']
		}
	);

	if (validate.fails()) {
		return new PreconditionFailedError(res, validate.errors.all());
	}

	const result = await new LogsInfo().get_all(
		'admin',
		Number(req.query.page),
		Number(req.query.limit),
		<string>req.query.type,
		<string>req.query.start_date,
		<string>req.query.end_date,
		req.admin_id
	);

	return ApiRes(res, {
		status: result.is_success ? HttpStatus.OK : HttpStatus.INTERNAL_SERVER_ERROR,
		data: result.data
	});
};

export const get_all_for_users = async (req: Request, res: Response) => {
	const validate = new Validator(
		{
			page: req.query.page,
			limit: req.query.limit,
			type: req.query.type,
			start_date: req.query.start_date,
			end_date: req.query.end_date,
			user_type: req.query.user_type,
			user_id: req.query.user_id
		},
		{
			page: ['required', 'numeric'],
			limit: ['required', 'numeric'],
			type: ['string', { in: Object.keys(LogTypeEnum) }],
			start_date: ['string'],
			end_date: ['string'],
			user_type: ['string', { in: ['teacher', 'student'] }, 'required'],
			user_id: ['string']
		}
	);

	if (validate.fails()) {
		return new PreconditionFailedError(res, validate.errors.all());
	}

	const result = await new LogsInfo().get_all(
		<string>req.query.user_type,
		Number(req.query.page),
		Number(req.query.limit),
		<string>req.query.type,
		<string>req.query.start_date,
		<string>req.query.end_date,
		<string>req.query.user_id
	);

	return ApiRes(res, {
		status: result.is_success ? HttpStatus.OK : HttpStatus.INTERNAL_SERVER_ERROR,
		data: result.data
	});
};
