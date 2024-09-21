import { Request, Response } from 'express';

import Validator from 'validatorjs';
import { ClassLevelInfo } from '../methods/class_level/class_level_info';
import { ClassLevelCreate } from '../methods/class_level/class_level_create';
import { ApiRes } from '../../../lib/http/api_response';
import { HttpStatus } from '../../../lib/http/http_status';
import { PreconditionFailedError } from '../../../lib/http/error/precondition_failed.error';
import { ClassLevelUpdate } from '../methods/class_level/class_level_update';
import { ClassLevelDestroy } from '../methods/class_level/class_level_destroy';

export const get_all = async (req: Request, res: Response) => {
	const result = await new ClassLevelInfo().get_all();
	return ApiRes(res, {
		status: result.is_success ? HttpStatus.OK : HttpStatus.NOT_FOUND,
		data: result.data
	});
};

export const get_all_by_section_id = async (req: Request, res: Response) => {
	const result = await new ClassLevelInfo().get_all_by_section_id(req.params.section_id);
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

export const destroy = async (req: Request, res: Response) => {
	const validate = new Validator(
		{
			class_level_id: req.body.class_level_id
		},
		{
			class_level_id: ['required', 'string']
		}
	);

	if (validate.fails()) {
		return new PreconditionFailedError(res, validate.errors.all());
	}
	const result = await new ClassLevelDestroy().destroy(req.body.class_level_id);
	return ApiRes(res, {
		status: result.is_success ? HttpStatus.NO_CONTENT : HttpStatus.INTERNAL_SERVER_ERROR,
		data: result.data
	});
};

export const create_class_level = async (req: Request, res: Response) => {
	const validate = new Validator(
		{
			name: req.body.name,
			section_id: req.body.section_id,
			level: req.body.level
		},
		{
			name: ['required', 'string'],
			section_id: ['required', 'string'],
			level: ['required', 'numeric']
		}
	);

	if (validate.fails()) {
		return new PreconditionFailedError(res, validate.errors.all());
	}

	const result = await new ClassLevelCreate().create(req.body.name, req.body.section_id, req.body.level);

	return ApiRes(res, {
		status: result ? HttpStatus.OK : HttpStatus.INTERNAL_SERVER_ERROR,
		data: result.data
	});
};

export const update_class_level = async (req: Request, res: Response) => {
	const validate = new Validator(
		{
			id: req.body.id,
			name: req.body.name,
			section_id: req.body.section_id,
			level: req.body.level,
			is_active: req.body.is_active
		},
		{
			id: ['required', 'string'],
			name: ['string'],
			section_id: ['string'],
			level: ['numeric'],
			is_active: ['boolean']
		}
	);

	if (validate.fails()) {
		return new PreconditionFailedError(res, validate.errors.all());
	}

	const result = await new ClassLevelUpdate().update(
		req.body.id,
		req.body.name,
		req.body.section_id,
		req.body.level,
		req.body.is_active
	);

	return ApiRes(res, {
		status: result ? HttpStatus.OK : HttpStatus.INTERNAL_SERVER_ERROR,
		data: result.data
	});
};
