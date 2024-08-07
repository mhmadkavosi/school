import { Request, Response } from 'express';

import Validator from 'validatorjs';

import { SexEnum } from '../models/enums/sex.enum';
import { ApiRes } from '../../../lib/http/api_response';
import { HttpStatus } from '../../../lib/http/http_status';
import { PreconditionFailedError } from '../../../lib/http/error/precondition_failed.error';
import { SchoolInfo } from '../methods/school_info';
import { SchoolCreate } from '../methods/school_create';
import { SchoolUpdate } from '../methods/school_update';

export const get_all = async (req: Request, res: Response) => {
	const result = await new SchoolInfo().get_all();
	return ApiRes(res, {
		status: result.is_success ? HttpStatus.OK : HttpStatus.NOT_FOUND,
		data: result.data
	});
};

export const get_info_by_id = async (req: Request, res: Response) => {
	const result = await new SchoolInfo().get_info_by_id(req.params.school_id);
	return ApiRes(res, {
		status: result.is_success ? HttpStatus.OK : HttpStatus.NOT_FOUND,
		data: result.data
	});
};

export const create_school = async (req: Request, res: Response) => {
	const validate = new Validator(
		{
			name: req.body.name,
			sex: req.body.sex
		},
		{
			name: ['required', 'string'],
			sex: ['required', 'string', { in: [Object.keys(SexEnum)] }]
		}
	);

	if (validate.fails()) {
		return new PreconditionFailedError(res, validate.errors.all());
	}

	const result = await new SchoolCreate().create(req.body.name, req.body.sex);

	return ApiRes(res, {
		status: result.is_success ? HttpStatus.OK : HttpStatus.NOT_FOUND,
		data: result.data
	});
};

export const update_school = async (req: Request, res: Response) => {
	const validate = new Validator(
		{
			school_id: req.body.school_id,
			name: req.body.name,
			sex: req.body.sex
		},
		{
			school_id: ['required', 'string'],
			name: ['string'],
			sex: ['string', { in: [Object.keys(SexEnum)] }]
		}
	);

	if (validate.fails()) {
		return new PreconditionFailedError(res, validate.errors.all());
	}

	const result = await new SchoolUpdate().update(req.body.school_id, req.body.name, req.body.sex);

	return ApiRes(res, {
		status: result.is_success ? HttpStatus.OK : HttpStatus.NOT_FOUND
	});
};
