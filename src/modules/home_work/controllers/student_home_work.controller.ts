import { Response, Request } from 'express';
import Validator from 'validatorjs';
import { PreconditionFailedError } from '../../../lib/http/error/precondition_failed.error';
import { StudentHomeWorkUpdate } from '../methods/student_home_work/student_home_work_update';
import { ApiRes } from '../../../lib/http/api_response';
import { HttpStatus } from '../../../lib/http/http_status';
import { StudentHomeWorkStatusEnum } from '../models/enums/student_home_work.enum';
import { StudentHomeWrkInfo } from '../methods/student_home_work/student_home_work_info';

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

export const get_student_home_work = async (req: Request, res: Response) => {
	const validate = new Validator(
		{
			status: req.query.status
		},
		{
			status: [{ in: Object.keys(StudentHomeWorkStatusEnum) }]
		}
	);

	if (validate.fails()) {
		return new PreconditionFailedError(res, validate.errors.all());
	}

	const result = await new StudentHomeWrkInfo().get_student_home_work(
		req.student_id,
		<string>req.query.status
	);

	return ApiRes(res, {
		status: result.is_success ? HttpStatus.OK : HttpStatus.INTERNAL_SERVER_ERROR,
		data: result.data
	});
};

export const get_student_home_work_details = async (req: Request, res: Response) => {
	const result = await new StudentHomeWrkInfo().get_student_home_work_details(
		req.student_id,
		req.params.home_work_id
	);

	return ApiRes(res, {
		status: result.is_success ? HttpStatus.OK : HttpStatus.INTERNAL_SERVER_ERROR,
		data: result.data
	});
};

export const get_count_home_work = async (req: Request, res: Response) => {
	const validate = new Validator(
		{
			status: req.query.status
		},
		{
			status: [{ in: Object.keys(StudentHomeWorkStatusEnum) }]
		}
	);

	if (validate.fails()) {
		return new PreconditionFailedError(res, validate.errors.all());
	}

	const result = await new StudentHomeWrkInfo().get_count_of_status_student(
		req.student_id,
		<string>req.query.status
	);

	return ApiRes(res, {
		status: result.is_success ? HttpStatus.OK : HttpStatus.INTERNAL_SERVER_ERROR,
		data: result.data
	});
};

export const status_done_student = async (req: Request, res: Response) => {
	const validate = new Validator(
		{
			home_work_id: req.body.home_work_id
		},
		{
			home_work_id: ['required', 'string']
		}
	);

	if (validate.fails()) {
		return new PreconditionFailedError(res, validate.errors.all());
	}

	const result = await new StudentHomeWorkUpdate().update_status_student(
		req.student_id,
		StudentHomeWorkStatusEnum.done,
		req.body.home_work_id
	);

	return ApiRes(res, {
		status: result.is_success ? HttpStatus.OK : HttpStatus.INTERNAL_SERVER_ERROR
	});
};

export const get_all_student_of_home_work = async (req: Request, res: Response) => {
	const validate = new Validator(
		{
			page: req.query.page,
			limit: req.query.limit,
			start_date: req.query.start_date,
			end_date: req.query.end_date
		},
		{
			page: ['required', 'numeric'],
			limit: ['required', 'numeric'],
			home_work_id: ['string'],
			status: [{ in: Object.keys(StudentHomeWorkStatusEnum) }],
			class_id: ['string']
		}
	);

	if (validate.fails()) {
		return new PreconditionFailedError(res, validate.errors.all());
	}

	const result = await new StudentHomeWrkInfo().get_home_work_activity_student(
		Number(req.query.page),
		Number(req.query.limit),
		req.student_id,
		<string>req.query.start_date,
		<string>req.query.end_date
	);

	return ApiRes(res, {
		status: result.is_success ? HttpStatus.OK : HttpStatus.INTERNAL_SERVER_ERROR,
		data: result.data
	});
};

export const get_assignment_count = async (req: Request, res: Response) => {
	const result = await new StudentHomeWrkInfo().get_assignment_count(req.student_id);

	return ApiRes(res, {
		status: result.is_success ? HttpStatus.OK : HttpStatus.INTERNAL_SERVER_ERROR,
		data: result.data
	});
};

export const get_new_assignment_count = async (req: Request, res: Response) => {
	const result = await new StudentHomeWrkInfo().get_new_assignment_count(req.student_id);

	return ApiRes(res, {
		status: result.is_success ? HttpStatus.OK : HttpStatus.INTERNAL_SERVER_ERROR,
		data: result.data
	});
};
