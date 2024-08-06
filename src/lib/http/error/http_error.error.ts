import { ApiRes } from '../api_response';
import e, { Response } from 'express';
import { ValidationErrors } from 'validatorjs';

export abstract class HttpError {
	response: Response;
	status: number;
	message: string | null | ValidationErrors;

	protected constructor(response: Response, status: number, message: string | null | ValidationErrors) {
		this.response = response;
		this.status = status;
		this.message = message;
		this.send();
	}

	send(): e.Response<any, Record<string, any>> {
		return ApiRes(this.response, {
			status: this.status,
			msg: this.message
		});
	}
}
