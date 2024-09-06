import { Request, Response } from 'express';
import Validator from 'validatorjs';
import { ApiRes } from '../../../lib/http/api_response';
import { HttpStatus } from '../../../lib/http/http_status';
import { PreconditionFailedError } from '../../../lib/http/error/precondition_failed.error';
import { AttendanceReasonInfo } from '../methods/attendance_reason/attendance_reason_info';
import { AttendanceReasonCreate } from '../methods/attendance_reason/attendance_reason_create';

export const get_all = async (req: Request, res: Response) => {
	const result = await new AttendanceReasonInfo().get_all();
	return ApiRes(res, {
		status: result.is_success ? HttpStatus.OK : HttpStatus.NOT_FOUND,
		data: result.data
	});
};

export const get_info_by_id = async (req: Request, res: Response) => {
	const result = await new AttendanceReasonInfo().get_info_by_id(req.params.attendance_reason_id);
	return ApiRes(res, {
		status: result.is_success ? HttpStatus.OK : HttpStatus.NOT_FOUND,
		data: result.data
	});
};

export const create_attendance_reason = async (req: Request, res: Response) => {
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

	const result = await new AttendanceReasonCreate().create(req.body.name);

	return ApiRes(res, {
		status: result ? HttpStatus.OK : HttpStatus.INTERNAL_SERVER_ERROR,
		data: result.data
	});
};
