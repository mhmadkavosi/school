import { Request, Response } from 'express';

import Validator from 'validatorjs';
import { MajorInfo } from '../methods/major/majort_info';
import { MajorCreate } from '../methods/major/major_create';
import { ApiRes } from '../../../lib/http/api_response';
import { HttpStatus } from '../../../lib/http/http_status';
import { PreconditionFailedError } from '../../../lib/http/error/precondition_failed.error';

export const get_all = async (req: Request, res: Response) => {
	const result = await new MajorInfo().get_all();
	return ApiRes(res, {
		status: result.is_success ? HttpStatus.OK : HttpStatus.NOT_FOUND,
		data: result.data
	});
};

export const get_info_by_id = async (req: Request, res: Response) => {
	const result = await new MajorInfo().get_info_by_id(req.params.major_id);
	return ApiRes(res, {
		status: result.is_success ? HttpStatus.OK : HttpStatus.NOT_FOUND,
		data: result.data
	});
};

export const create_major = async (req: Request, res: Response) => {
	const validate = new Validator(
		{
			name: req.body.name
		},
		{
			name: ['required', 'string']
		}
	);

	if (validate.fails()) {
		return new PreconditionFailedError(res, validate.errors.all());
	}

	const result = await new MajorCreate().create(req.body.name);

	return ApiRes(res, {
		status: result ? HttpStatus.OK : HttpStatus.INTERNAL_SERVER_ERROR,
		data: result.data
	});
};
