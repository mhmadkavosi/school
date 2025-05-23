import { Request, Response } from 'express';

import Validator from 'validatorjs';
import { ApiRes } from '../../../lib/http/api_response';
import { HttpStatus } from '../../../lib/http/http_status';
import { PreconditionFailedError } from '../../../lib/http/error/precondition_failed.error';
import { SchoolInfo } from '../methods/school_info';
import { SexEnum } from '../models/enums/sex.enum';

export const get_total = async (req: Request, res: Response) => {
	const result = await new SchoolInfo().get_total_school();
	return ApiRes(res, {
		status: result.is_success ? HttpStatus.OK : HttpStatus.INTERNAL_SERVER_ERROR,
		data: result.data
	});
};

export const get_total_school_by_category = async (req: Request, res: Response) => {
	const result = await new SchoolInfo().get_total_school_by_category();
	return ApiRes(res, {
		status: result.is_success ? HttpStatus.OK : HttpStatus.INTERNAL_SERVER_ERROR,
		data: result.data
	});
};

export const get_all_school = async (req: Request, res: Response) => {
	const validate = new Validator(
		{
			page: req.query.page,
			limit: req.query.limit,
			sex: req.query.sex
		},
		{
			page: ['numeric', 'required'],
			limit: ['numeric', 'required'],
			sex: ['string', { in: Object.keys(SexEnum) }]
		}
	);

	if (validate.fails()) {
		return new PreconditionFailedError(res, validate.errors.all());
	}

	const result = await new SchoolInfo().get_all_school_info(
		Number(req.query.page),
		Number(req.query.limit),
		<string>req.query.sex
	);
	return ApiRes(res, {
		status: result.is_success ? HttpStatus.OK : HttpStatus.INTERNAL_SERVER_ERROR,
		data: result.data
	});
};

export const get_info_by_id = async (req: Request, res: Response) => {
	const result = await new SchoolInfo().get_info_by_id_admin(req.params.school_id);
	return ApiRes(res, {
		status: result.is_success ? HttpStatus.OK : HttpStatus.NOT_FOUND,
		data: result.data
	});
};
