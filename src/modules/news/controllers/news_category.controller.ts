import { Request, Response } from 'express';
import Validator from 'validatorjs';
import { PreconditionFailedError } from '../../../lib/http/error/precondition_failed.error';
import { HttpStatus } from '../../../lib/http/http_status';
import { ApiRes } from '../../../lib/http/api_response';
import { NewsCategoryCreate } from '../methods/news_category/news_category_create';
import { NewsCategoryUpdate } from '../methods/news_category/news_category_update';
import { NewsCategoryInfo } from '../methods/news_category/news_category_info';

export const create = async (req: Request, res: Response) => {
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
	const result = await new NewsCategoryCreate().create(req.body.name);

	return ApiRes(res, {
		status: result.is_success ? HttpStatus.OK : HttpStatus.INTERNAL_SERVER_ERROR,
		data: result.data
	});
};

export const update = async (req: Request, res: Response) => {
	const validate = new Validator(
		{
			category_id: req.body.category_id,
			is_active: req.body.is_active,
			name: req.body.name
		},
		{
			category_id: ['required', 'string'],
			is_active: ['boolean'],
			name: ['string']
		}
	);

	if (validate.fails()) {
		return new PreconditionFailedError(res, validate.errors.all());
	}
	const result = await new NewsCategoryUpdate().update(
		req.body.category_id,
		req.body.is_active,
		req.body.name
	);

	return ApiRes(res, {
		status: result.is_success ? HttpStatus.OK : HttpStatus.INTERNAL_SERVER_ERROR
	});
};

export const get_info = async (req: Request, res: Response) => {
	const result = await new NewsCategoryInfo().get_info_by_id(req.params.news_category_id);

	return ApiRes(res, {
		status: result.is_success ? HttpStatus.OK : HttpStatus.INTERNAL_SERVER_ERROR,
		data: result.data
	});
};

export const get_all = async (req: Request, res: Response) => {
	const result = await new NewsCategoryInfo().get_all();

	return ApiRes(res, {
		status: result.is_success ? HttpStatus.OK : HttpStatus.INTERNAL_SERVER_ERROR,
		data: result.data
	});
};
