import { Request, Response } from 'express';
import Validator from 'validatorjs';
import { PreconditionFailedError } from '../../../lib/http/error/precondition_failed.error';
import { ApiRes } from '../../../lib/http/api_response';
import { HttpStatus } from '../../../lib/http/http_status';
import { StudentTokenRemove } from '../methods/user_token/student_token_remove';
import { StudentTokenInfo } from '../methods/user_token/student_token_info';

export const remove_user_token = async (req: Request, res: Response) => {
	const validate = new Validator(
		{
			token_id: req.body.token_id
		},
		{
			token_id: ['required', 'string']
		}
	);

	if (validate.fails()) {
		return new PreconditionFailedError(res, validate.errors.all());
	}

	const result = await new StudentTokenRemove().remove_student_token_by_student_id_and_token_id(
		req.body.token_id,
		req.student_id
	);

	return ApiRes(res, <RestApi.ResInterface>{
		status: result.is_success ? HttpStatus.OK : HttpStatus.INTERNAL_SERVER_ERROR
	});
};

export const terminate_all_tokens = async (req: Request, res: Response) => {
	const result = await new StudentTokenRemove().remove_all_tokens_by_user_id(req.student_id);

	return ApiRes(res, <RestApi.ResInterface>{
		status: result.is_success ? HttpStatus.OK : HttpStatus.INTERNAL_SERVER_ERROR
	});
};

export const get_all_student_token = async (req: Request, res: Response) => {
	const result = await new StudentTokenInfo().get_all_student_token_by_user_id(req.student_id, req.token_id);

	return ApiRes(res, <RestApi.ResInterface>{
		status: result.is_success ? HttpStatus.OK : HttpStatus.INTERNAL_SERVER_ERROR,
		data: result.data
	});
};
