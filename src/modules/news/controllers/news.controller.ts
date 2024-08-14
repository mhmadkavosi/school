import { Response, Request } from 'express';
import Validator from 'validatorjs';
import { PreconditionFailedError } from '../../../lib/http/error/precondition_failed.error';
import { NewsBuilder } from '../methods/news/news.builder';
import { ApiRes } from '../../../lib/http/api_response';
import { HttpStatus } from '../../../lib/http/http_status';
import { NewsUpdate } from '../methods/news/news_update';
import { NewsInfo } from '../methods/news/news_info';
import { NewsDestroy } from '../methods/news/news_destroy';

export const create = async (req: Request, res: Response) => {
	const validate = new Validator(
		{
			school_id: req.body.school_id,
			title: req.body.title,
			news_category_id: req.body.news_category_id,
			description: req.body.description,
			file: req.body.file,
			priority: req.body.priority
		},
		{
			school_id: ['required', 'string'],
			title: ['required', 'string'],
			news_category_id: ['required', 'string'],
			description: ['required', 'string'],
			file: ['string'],
			priority: ['numeric']
		}
	);

	if (validate.fails()) {
		return new PreconditionFailedError(res, validate.errors.all());
	}

	const result = await new NewsBuilder()
		.setSchoolId(req.body.school_id)
		.setTitle(req.body.title)
		.setNewsCategoryId(req.body.news_category_id)
		.setDescription(req.body.description)
		.setFile(req.body.file)
		.setPriority(req.body.priority)
		.build();

	return ApiRes(res, {
		status: result.is_success ? HttpStatus.OK : HttpStatus.INTERNAL_SERVER_ERROR,
		data: result.data
	});
};

export const update = async (req: Request, res: Response) => {
	const validate = new Validator(
		{
			news_id: req.body.news_id,
			school_id: req.body.school_id,
			title: req.body.title,
			news_category_id: req.body.news_category_id,
			description: req.body.description,
			file: req.body.file,
			priority: req.body.priority
		},
		{
			news_id: ['required', 'string'],
			school_id: ['string'],
			title: ['string'],
			news_category_id: ['string'],
			description: ['string'],
			file: ['string'],
			priority: ['numeric']
		}
	);

	if (validate.fails()) {
		return new PreconditionFailedError(res, validate.errors.all());
	}

	const result = await new NewsUpdate().update(
		req.body.news_id,
		req.body.school_id,
		req.body.title,
		req.body.news_category_id,
		req.body.description,
		req.body.file,
		req.body.priority
	);
	return ApiRes(res, {
		status: result.is_success ? HttpStatus.OK : HttpStatus.INTERNAL_SERVER_ERROR
	});
};

export const get_all_news_by_school_id = async (req: Request, res: Response) => {
	const validate = new Validator(
		{
			page: req.query.page,
			limit: req.query.limit,
			school_id: req.query.school_id
		},
		{
			page: ['required', 'numeric'],
			limit: ['required', 'numeric'],
			school_id: ['required', 'string']
		}
	);

	if (validate.fails()) {
		return new PreconditionFailedError(res, validate.errors.all());
	}

	const result = await new NewsInfo().get_all_news_by_school_id(
		<string>req.query.school_id,
		Number(req.query.page),
		Number(req.query.limit)
	);

	return ApiRes(res, {
		status: result.is_success ? HttpStatus.OK : HttpStatus.INTERNAL_SERVER_ERROR,
		data: result.data
	});
};

export const get_all_news_by_category_id = async (req: Request, res: Response) => {
	const validate = new Validator(
		{
			page: req.query.page,
			limit: req.query.limit,
			category_id: req.query.category_id,
			sort: req.query.sort
		},
		{
			page: ['required', 'numeric'],
			limit: ['required', 'numeric'],
			category_id: ['required', 'string'],
			sort: ['required', { in: ['max_count', 'min_count'] }]
		}
	);

	if (validate.fails()) {
		return new PreconditionFailedError(res, validate.errors.all());
	}

	const result = await new NewsInfo().get_all_news_by_category_id(
		<string>req.query.category_id,
		Number(req.query.page),
		Number(req.query.limit),
		<string>req.query.sort
	);

	return ApiRes(res, {
		status: result.is_success ? HttpStatus.OK : HttpStatus.INTERNAL_SERVER_ERROR,
		data: result.data
	});
};

export const get_info = async (req: Request, res: Response) => {
	new NewsUpdate().auto_increment_view(req.params.news_id);
	const result = await new NewsInfo().get_info_by_id(req.params.news_id);

	return ApiRes(res, {
		status: result.is_success ? HttpStatus.OK : HttpStatus.INTERNAL_SERVER_ERROR,
		data: result.data
	});
};

export const destroy = async (req: Request, res: Response) => {
	const validate = new Validator(
		{
			news_id: req.body.news_id
		},
		{
			news_id: ['required', 'string']
		}
	);

	if (validate.fails()) {
		return new PreconditionFailedError(res, validate.errors.all());
	}
	const result = await new NewsDestroy().destroy(req.body.news_id);

	return ApiRes(res, {
		status: result.is_success ? HttpStatus.OK : HttpStatus.INTERNAL_SERVER_ERROR,
		data: result.data
	});
};
