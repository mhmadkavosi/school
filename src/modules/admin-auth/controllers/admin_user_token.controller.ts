import { Request, Response } from 'express';
import Validator from 'validatorjs';
import { AdminTokenRemove } from '../methods/user_token/admin_token_remove';
import { AdminTokenInfo } from '../methods/user_token/admin_token_info';
import { PreconditionFailedError } from '../../../lib/http/error/precondition_failed.error';
import { ApiRes } from '../../../lib/http/api_response';
import { HttpStatus } from '../../../lib/http/http_status';

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

	const result = await new AdminTokenRemove().remove_admin_token_by_admin_id_and_token_id(
		req.body.token_id,
		req.user_id
	);

	return ApiRes(res, <RestApi.ResInterface>{
		status: result.is_success ? HttpStatus.OK : HttpStatus.INTERNAL_SERVER_ERROR
	});
};

export const terminate_all_tokens = async (req: Request, res: Response) => {
	const result = await new AdminTokenRemove().remove_all_tokens_by_user_id(req.admin_id);

	return ApiRes(res, <RestApi.ResInterface>{
		status: result.is_success ? HttpStatus.OK : HttpStatus.INTERNAL_SERVER_ERROR
	});
};

export const get_all_admin_token = async (req: Request, res: Response) => {
	const result = await new AdminTokenInfo().get_all_admin_token_by_user_id(req.admin_id, req.token_id);

	return ApiRes(res, <RestApi.ResInterface>{
		status: result.is_success ? HttpStatus.OK : HttpStatus.INTERNAL_SERVER_ERROR,
		data: result.data
	});
};
