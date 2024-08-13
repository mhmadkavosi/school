import { Response, Request } from 'express';
import Validator from 'validatorjs';
import { PreconditionFailedError } from '../../../lib/http/error/precondition_failed.error';
import { StudentHomeWorkUpdate } from '../methods/student_home_work/student_home_work_update';
import { ApiRes } from '../../../lib/http/api_response';
import { HttpStatus } from '../../../lib/http/http_status';
import { StudentHomeWorkStatusEnum } from '../models/enums/student_home_work.enum';

export const update_desc = async (req: Request, res: Response) => {
	const validate = new Validator(
		{
			student_home_work_id: req.body.student_home_work_id,
			status_description: req.body.status_description,
			status_time: req.body.status_time
		},
		{
			student_home_work_id: ['required', 'string'],
			status_description: ['string'],
			status_time: ['date']
		}
	);

	if (validate.fails()) {
		return new PreconditionFailedError(res, validate.errors.all());
	}

	const result = await new StudentHomeWorkUpdate().add_desc(
		req.body.student_home_work_id,
		req.body.status_description,
		req.body.status_time
	);
	return ApiRes(res, {
		status: result.is_success ? HttpStatus.OK : HttpStatus.INTERNAL_SERVER_ERROR
	});
};

export const update_score = async (req: Request, res: Response) => {
	const validate = new Validator(
		{
			student_home_work_id: req.body.student_home_work_id,
			score: req.body.score
		},
		{
			student_home_work_id: ['required', 'string'],
			score: ['numeric', 'required']
		}
	);

	if (validate.fails()) {
		return new PreconditionFailedError(res, validate.errors.all());
	}

	const result = await new StudentHomeWorkUpdate().add_score(req.body.student_home_work_id, req.body.score);
	return ApiRes(res, {
		status: result.is_success ? HttpStatus.OK : HttpStatus.INTERNAL_SERVER_ERROR
	});
};

export const update_status = async (req: Request, res: Response) => {
	const validate = new Validator(
		{
			student_home_work_id: req.body.student_home_work_id,
			status: req.body.status
		},
		{
			student_home_work_id: ['required', 'string'],
			status: ['required', { in: Object.keys(StudentHomeWorkStatusEnum) }]
		}
	);

	if (validate.fails()) {
		return new PreconditionFailedError(res, validate.errors.all());
	}

	const result = await new StudentHomeWorkUpdate().update_status(
		req.body.student_home_work_id,
		req.body.status
	);

	return ApiRes(res, {
		status: result.is_success ? HttpStatus.OK : HttpStatus.INTERNAL_SERVER_ERROR
	});
};
