import { Request, Response } from 'express';
import Validator from 'validatorjs';
import { PreconditionFailedError } from '../../../lib/http/error/precondition_failed.error';
import { BadRequestError } from '../../../lib/http/error/bad_request.error';
import { InternalServerError } from '../../../lib/http/error/internal_server.error';
import { HttpStatus } from '../../../lib/http/http_status';
import { ApiRes } from '../../../lib/http/api_response';
import { TeacherInfo } from '../methods/teacher_info';

export const get_total_teacher = async (req: Request, res: Response) => {
	const result = await new TeacherInfo().get_total_teachers();
	return ApiRes(res, {
		status: result.is_success ? HttpStatus.OK : HttpStatus.INTERNAL_SERVER_ERROR,
		data: result.data
	});
};

export const get_total_teacher_section = async (req: Request, res: Response) => {
	const result = await new TeacherInfo().get_teachers_group_by_section();
	return ApiRes(res, {
		status: result.is_success ? HttpStatus.OK : HttpStatus.INTERNAL_SERVER_ERROR,
		data: result.data
	});
};

export const get_all_teacher = async (req: Request, res: Response) => {
	const validate = new Validator(
		{
			page: req.query.page,
			limit: req.query.limit
		},
		{
			page: ['numeric', 'required'],
			limit: ['numeric', 'required']
		}
	);

	if (validate.fails()) {
		return new PreconditionFailedError(res, validate.errors.all());
	}

	const result = await new TeacherInfo().get_teacher_list(Number(req.query.page), Number(req.query.limit));
	return ApiRes(res, {
		status: result.is_success ? HttpStatus.OK : HttpStatus.INTERNAL_SERVER_ERROR,
		data: result.data
	});
};

export const get_by_id = async (req: Request, res: Response) => {
	const result = await new TeacherInfo().get_by_id(req.params.teacher_id);

	return ApiRes(res, {
		status: result.is_success ? HttpStatus.OK : HttpStatus.INTERNAL_SERVER_ERROR,
		data: result.data
	});
};
