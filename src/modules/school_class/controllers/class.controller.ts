import { InternalServerError } from '../../../lib/http/error/internal_server.error';
import { Request, Response } from 'express';
import Validator from 'validatorjs';
import { ClassInfo } from '../methods/class/class_info';
import { ClassDestroy } from '../methods/class/class_destroy';
import { ClassUpdate } from '../methods/class/class_update';
import { ClassBuilder } from '../methods/class/class.builder';
import { HttpStatus } from '../../../lib/http/http_status';
import { ApiRes } from '../../../lib/http/api_response';
import { PreconditionFailedError } from '../../../lib/http/error/precondition_failed.error';
import { ClassHomeWorkInfo } from '../../home_work/methods/class_home_work/class_home_work_info';
import { HomeWorkDestroy } from '../../home_work/methods/home_work/home_work_destroy';
import { StudentHomeWorDestroy } from '../../home_work/methods/student_home_work/student_home_work_destroy';
import { StudentInfo } from '../../student/methods/student_info';

export const get_all_class_of_teacher = async (req: Request, res: Response) => {
	const result = await new ClassInfo().get_all_by_teacher_id(req.user_id);

	return ApiRes(res, {
		status: result.is_success ? HttpStatus.OK : HttpStatus.INTERNAL_SERVER_ERROR,
		data: result.data
	});
};

export const get_by_link = async (req: Request, res: Response) => {
	const result = await new ClassInfo().get_by_link(req.params.link);

	return ApiRes(res, {
		status: result.is_success ? HttpStatus.OK : HttpStatus.INTERNAL_SERVER_ERROR,
		data: result.data
	});
};

export const get_by_id = async (req: Request, res: Response) => {
	const result = await new ClassInfo().get_by_id(req.params.class_id);

	return ApiRes(res, {
		status: result.is_success ? HttpStatus.OK : HttpStatus.INTERNAL_SERVER_ERROR,
		data: result.data
	});
};

export const get_all_by_school_id = async (req: Request, res: Response) => {
	const result = await new ClassInfo().get_all_by_school_id(req.params.school_id);

	return ApiRes(res, {
		status: result.is_success ? HttpStatus.OK : HttpStatus.INTERNAL_SERVER_ERROR,
		data: result.data
	});
};

export const get_all_student_by_school_id = async (req: Request, res: Response) => {
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

	const result = await new StudentInfo().get_all_student_by_school_id(
		Number(req.query.page),
		Number(req.query.limit),
		req.params.school_id
	);

	return ApiRes(res, {
		status: result.is_success ? HttpStatus.OK : HttpStatus.INTERNAL_SERVER_ERROR,
		data: result.data
	});
};

export const destroy_class = async (req: Request, res: Response) => {
	const validate = new Validator(
		{
			class_id: req.body.class_id
		},
		{
			class_id: ['required', 'string']
		}
	);

	if (validate.fails()) {
		return new PreconditionFailedError(res, validate.errors.all());
	}
	const get_all_home_work = await new ClassHomeWorkInfo().get_info_by_class(req.body.class_id);

	for (let i = 0; i < get_all_home_work.data.length; i++) {
		await new HomeWorkDestroy().destroy(get_all_home_work.data[i].home_work_id);
		await new StudentHomeWorDestroy().destroy_by_home_work_id(get_all_home_work.data[i].home_work_id);
	}

	const result = await new ClassDestroy().destroy(req.body.class_id, req.user_id);

	return ApiRes(res, {
		status: result.is_success ? HttpStatus.OK : HttpStatus.INTERNAL_SERVER_ERROR
	});
};

export const update_class = async (req: Request, res: Response) => {
	const validate = new Validator(
		{
			class_id: req.body.class_id,
			school_id: req.body.school_id,
			major_id: req.body.major_id,
			class_level_id: req.body.class_level_id,
			count: req.body.count,
			name: req.body.name
		},
		{
			class_id: ['required', 'string'],
			school_id: ['string'],
			major_id: ['string'],
			class_level_id: ['string'],
			count: ['numeric'],
			name: ['string']
		}
	);

	if (validate.fails()) {
		return new PreconditionFailedError(res, validate.errors.all());
	}

	const update = await new ClassUpdate().update(
		req.body.class_id,
		req.user_id,
		req.body.school_id,
		req.body.major_id,
		req.body.class_level_id,
		req.body.count,
		req.body.name
	);
	return ApiRes(res, {
		status: update.is_success ? HttpStatus.OK : HttpStatus.INTERNAL_SERVER_ERROR
	});
};

export const create_class = async (req: Request, res: Response) => {
	const validate = new Validator(
		{
			school_id: req.body.school_id,
			major_id: req.body.major_id,
			class_level_id: req.body.class_level_id,
			count: req.body.count,
			name: req.body.name
		},
		{
			school_id: ['required', 'string'],
			major_id: ['required', 'string'],
			class_level_id: ['required', 'string'],
			count: ['required', 'numeric'],
			name: ['required', 'string']
		}
	);

	if (validate.fails()) {
		return new PreconditionFailedError(res, validate.errors.all());
	}

	const link = await new ClassInfo().get_link();
	console.log(req.user_id);
	if (!link) {
		return new InternalServerError(res);
	}

	const result = await new ClassBuilder()
		.setClassLevelId(req.body.class_level_id)
		.setCount(req.body.count)
		.setLink(link)
		.setMajorId(req.body.major_id)
		.setSchoolId(req.body.school_id)
		.setTeacherId(req.user_id)
		.setName(req.body.name)
		.build();

	return ApiRes(res, {
		status: result.is_success ? HttpStatus.OK : HttpStatus.INTERNAL_SERVER_ERROR,
		data: result.data
	});
};
