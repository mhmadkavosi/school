import { InternalServerError } from '../../../lib/http/error/internal_server.error';
import { Request, Response } from 'express';
import Validator from 'validatorjs';
import { ClassInfo } from '../methods/class/class_info';
import { HttpStatus } from '../../../lib/http/http_status';
import { ApiRes } from '../../../lib/http/api_response';
import { PreconditionFailedError } from '../../../lib/http/error/precondition_failed.error';
import { ClassUpdate } from '../methods/class/class_update';
import { ClassHomeWorkInfo } from '../../home_work/methods/class_home_work/class_home_work_info';
import { HomeWorkDestroy } from '../../home_work/methods/home_work/home_work_destroy';
import { StudentHomeWorDestroy } from '../../home_work/methods/student_home_work/student_home_work_destroy';
import { ClassDestroy } from '../methods/class/class_destroy';
import { ClassBuilder } from '../methods/class/class.builder';
import { StudentInfo } from '../../student/methods/student_info';

export const get_all_class_of_teacher = async (req: Request, res: Response) => {
	const validate = new Validator(
		{
			teacher_id: req.query.teacher_id,
			page: req.query.page,
			limit: req.query.limit
		},
		{
			teacher_id: ['string', 'required'],
			page: ['numeric', 'required'],
			limit: ['numeric', 'required']
		}
	);

	if (validate.fails()) {
		return new PreconditionFailedError(res, validate.errors.all());
	}
	const result = await new ClassInfo().get_classes_by_teacher(
		<string>req.query.teacher_id,
		Number(req.query.limit),
		Number(req.query.page)
	);

	return ApiRes(res, {
		status: result.is_success ? HttpStatus.OK : HttpStatus.INTERNAL_SERVER_ERROR,
		data: result.data
	});
};

export const update_class = async (req: Request, res: Response) => {
	const validate = new Validator(
		{
			class_id: req.body.class_id,
			school_id: req.body.school_id,
			teacher_id: req.body.teacher_id,
			class_level_id: req.body.class_level_id,
			count: req.body.count,
			name: req.body.name,
			major_type: req.body.major_type,
			major: req.body.major
		},
		{
			teacher_id: ['required', 'string'],
			class_id: ['required', 'string'],
			school_id: ['string'],
			class_level_id: ['string'],
			count: ['numeric'],
			name: ['string'],
			major: ['string'],
			major_type: ['string']
		}
	);

	if (validate.fails()) {
		return new PreconditionFailedError(res, validate.errors.all());
	}

	const update = await new ClassUpdate().update(
		req.body.class_id,
		req.body.teacher_id,
		req.body.school_id,
		req.body.class_level_id,
		req.body.count,
		req.body.name,
		req.body.major,
		req.body.major_type
	);
	return ApiRes(res, {
		status: update.is_success ? HttpStatus.OK : HttpStatus.INTERNAL_SERVER_ERROR
	});
};

export const destroy_class = async (req: Request, res: Response) => {
	const validate = new Validator(
		{
			teacher_id: req.body.teacher_id,

			class_id: req.body.class_id
		},
		{
			teacher_id: ['required', 'string'],

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

	const result = await new ClassDestroy().destroy(req.body.class_id, req.body.teacher_id);

	return ApiRes(res, {
		status: result.is_success ? HttpStatus.OK : HttpStatus.INTERNAL_SERVER_ERROR
	});
};

export const create_class = async (req: Request, res: Response) => {
	const validate = new Validator(
		{
			school_id: req.body.school_id,
			class_level_id: req.body.class_level_id,
			count: req.body.count,
			teacher_id: req.body.teacher_id,

			name: req.body.name,
			color: req.body.color,
			major: req.body.major,
			major_type: req.body.major_type
		},
		{
			school_id: ['required', 'string'],
			teacher_id: ['required', 'string'],

			class_level_id: ['required', 'string'],
			count: ['required', 'numeric'],
			name: ['required', 'string'],
			color: ['required', 'string'],
			major: ['string'],
			major_type: ['string']
		}
	);

	if (validate.fails()) {
		return new PreconditionFailedError(res, validate.errors.all());
	}

	const link = await new ClassInfo().get_link();
	if (!link) {
		return new InternalServerError(res);
	}

	const result = await new ClassBuilder()
		.setClassLevelId(req.body.class_level_id)
		.setCount(req.body.count)
		.setLink(link)
		.setSchoolId(req.body.school_id)
		.setTeacherId(req.body.teacher_id)
		.setName(req.body.name)
		.setColor(req.body.color)
		.setMajor(req.body.major)
		.setMajorType(req.body.major_type)
		.build();

	return ApiRes(res, {
		status: result.is_success ? HttpStatus.OK : HttpStatus.INTERNAL_SERVER_ERROR,
		data: result.data
	});
};

export const get_all_student_by_class_id = async (req: Request, res: Response) => {
	const validate = new Validator(
		{
			class_id: req.query.class_id,
			page: req.query.page,
			limit: req.query.limit
		},
		{
			class_id: ['required', 'string'],
			page: ['numeric', 'required'],
			limit: ['numeric', 'required']
		}
	);

	if (validate.fails()) {
		return new PreconditionFailedError(res, validate.errors.all());
	}

	const result = await new StudentInfo().get_all_student_of_class_paginate(
		Number(req.query.page),
		Number(req.query.limit),
		<string>req.query.class_id
	);

	return ApiRes(res, {
		status: result.is_success ? HttpStatus.OK : HttpStatus.INTERNAL_SERVER_ERROR,
		data: result.data
	});
};

export const get_teacher_by_class_id = async (req: Request, res: Response) => {
	const validate = new Validator(
		{
			class_id: req.query.class_id
		},
		{
			class_id: ['required', 'string']
		}
	);

	if (validate.fails()) {
		return new PreconditionFailedError(res, validate.errors.all());
	}
	const result = await new ClassInfo().get_teacher_by_class_id(<string>req.query.class_id);

	return ApiRes(res, {
		status: result.is_success ? HttpStatus.OK : HttpStatus.INTERNAL_SERVER_ERROR,
		data: result.data
	});
};
