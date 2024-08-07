import { Request, Response } from 'express';

import Validator from 'validatorjs';
import { ClassLevelInfo } from '../methods/class_level/class_level_info';
import { ClassLevelCreate } from '../methods/class_level/class_level_create';
import { ApiRes } from '../../../lib/http/api_response';
import { HttpStatus } from '../../../lib/http/http_status';
import { PreconditionFailedError } from '../../../lib/http/error/precondition_failed.error';

export const get_all = async (req: Request, res: Response) => {
	const result = await new ClassLevelInfo().get_all();
	return ApiRes(res, {
		status: result.is_success ? HttpStatus.OK : HttpStatus.NOT_FOUND,
		data: result.data
	});
};

export const get_info_by_id = async (req: Request, res: Response) => {
	const result = await new ClassLevelInfo().get_info_by_id(req.params.class_level_id);
	return ApiRes(res, {
		status: result.is_success ? HttpStatus.OK : HttpStatus.NOT_FOUND,
		data: result.data
	});
};

export const create_class_level = async (req: Request, res: Response) => {
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

	const result = await new ClassLevelCreate().create(req.body.name);

	return ApiRes(res, {
		status: result ? HttpStatus.OK : HttpStatus.INTERNAL_SERVER_ERROR,
		data: result.data
	});
};
