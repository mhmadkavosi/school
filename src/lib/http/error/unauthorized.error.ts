import { HttpError } from './http_error.error';
import { HttpStatus } from '../http_status';
import { Response } from 'express';

export class UnauthorizedError extends HttpError {
	constructor(response: Response, message: string | null = null) {
		super(response, HttpStatus.UNAUTHORIZED, message);
	}
}
