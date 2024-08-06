import { HttpError } from './http_error.error';
import { HttpStatus } from '../http_status';
import { Response } from 'express';
import { ValidationErrors } from 'validatorjs';

export class PreconditionFailedError extends HttpError {
	constructor(response: Response, message: string | null | ValidationErrors = null) {
		super(response, HttpStatus.PRECONDITION_FAILED, message);
	}
}
