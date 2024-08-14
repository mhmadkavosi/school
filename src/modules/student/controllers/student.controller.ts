import { hash_password } from './../../../utils/hashed_id_generetor.utility';
import { Request, Response } from 'express';
import Validator from 'validatorjs';
import { ApiRes } from '../../../lib/http/api_response';
import { HttpStatus } from '../../../lib/http/http_status';
import { PreconditionFailedError } from '../../../lib/http/error/precondition_failed.error';
import { StudentBuilder } from '../methods/student.builder';
import { StudentInfo } from '../methods/student_info';
import { StudentDestroy } from '../methods/student_destroy';
import { StudentHomeWorDestroy } from '../../home_work/methods/student_home_work/student_home_work_destroy';
import { StudentUpdate } from '../methods/student_update';

export const create = async (req: Request, res: Response) => {
	const validate = new Validator(
		{
			name: req.body.name,
			class_id: req.body.class_id,
			family: req.body.family,
			email: req.body.email,
			phone: req.body.phone,
			national_code: req.body.national_code,
			student_status: req.body.student_status,
			birth_date: req.body.birth_date,
			profile_picture: req.body.profile_picture
		},
		{
			name: ['required', 'string'],
			class_id: ['required', 'string'],
			family: ['required', 'string'],
			email: ['required', 'email'],
			phone: ['string'],
			national_code: ['required', 'string'],
			student_status: ['string'],
			birth_date: ['required', 'date'],
			profile_picture: ['string']
		}
	);

	if (validate.fails()) {
		return new PreconditionFailedError(res, validate.errors.all());
	}

	const email_info = await new StudentInfo().get_by_email(req.body.email);
	const national_code_info = await new StudentInfo().get_by_national_code(req.body.national_code);
	const phone_info = await new StudentInfo().get_by_phone_number(req.body.phone);

	if (email_info.is_success || phone_info.is_success) {
		return ApiRes(res, {
			status: HttpStatus.BAD_REQUEST,
			msg: 'Email Duplicate Error'
		});
	}
	if (national_code_info.is_success) {
		return ApiRes(res, {
			status: HttpStatus.BAD_REQUEST,
			msg: 'National code Duplicate Error'
		});
	}

	if (phone_info.is_success) {
		return ApiRes(res, {
			status: HttpStatus.BAD_REQUEST,
			msg: 'Phone Duplicate Error'
		});
	}

	const result = await new StudentBuilder()
		.setName(req.body.name)
		.setClassId(req.body.class_id)
		.setFamily(req.body.family)
		.setEmail(req.body.email)
		.setPhone(req.body.phone)
		.setNationalCode(req.body.national_code)
		.setStudentStatus(req.body.student_status)
		.setBirthDate(req.body.birth_date)
		.setPassword(hash_password(req.body.national_code))
		.setProfilePicture(req.body.profile_picture)
		.build();

	return ApiRes(res, {
		status: result.is_success ? HttpStatus.OK : HttpStatus.INTERNAL_SERVER_ERROR,
		data: result.data
	});
};

export const update = async (req: Request, res: Response) => {
	const validate = new Validator(
		{
			student_id: req.body.student_id,
			name: req.body.name,
			class_id: req.body.class_id,
			family: req.body.family,
			email: req.body.email,
			phone: req.body.phone,
			national_code: req.body.national_code,
			student_status: req.body.student_status,
			birth_date: req.body.birth_date,
			profile_picture: req.body.profile_picture
		},
		{
			student_id: ['required', 'string'],
			name: ['string'],
			class_id: ['string'],
			family: ['string'],
			email: ['email'],
			phone: ['string'],
			national_code: ['string'],
			student_status: ['string'],
			birth_date: ['date'],
			profile_picture: ['string']
		}
	);

	if (validate.fails()) {
		return new PreconditionFailedError(res, validate.errors.all());
	}

	const result = await new StudentUpdate().update(
		req.body.student_id,
		req.body.name,
		req.body.class_id,
		req.body.family,
		req.body.email,
		req.body.phone,
		req.body.national_code,
		req.body.student_status,
		req.body.birth_date,
		req.body.profile_picture
	);

	return ApiRes(res, {
		status: result.is_success ? HttpStatus.OK : HttpStatus.INTERNAL_SERVER_ERROR
	});
};

export const get_all_student_of_class = async (req: Request, res: Response) => {
	const validate = new Validator(
		{
			page: req.query.page,
			limit: req.query.limit,
			class_id: req.query.class_id
		},
		{
			page: ['numeric', 'required'],
			limit: ['numeric', 'required'],
			class_id: ['string', 'required']
		}
	);

	if (validate.fails()) {
		return new PreconditionFailedError(res, validate.errors.all());
	}

	const result = await new StudentInfo().get_all_student_of_class_with_pagination(
		Number(req.query.page),
		Number(req.query.limit),
		<string>req.query.class_id
	);

	return ApiRes(res, {
		status: result.is_success ? HttpStatus.OK : HttpStatus.INTERNAL_SERVER_ERROR,
		data: result.data
	});
};

export const get_info = async (req: Request, res: Response) => {
	const result = await new StudentInfo().get_by_id(req.params.student_id);

	return ApiRes(res, {
		status: result.is_success ? HttpStatus.OK : HttpStatus.INTERNAL_SERVER_ERROR,
		data: result.data
	});
};

export const delete_student = async (req: Request, res: Response) => {
	const validate = new Validator(
		{
			student_id: req.body.student_id
		},
		{
			student_id: ['required', 'string']
		}
	);

	if (validate.fails()) {
		return new PreconditionFailedError(res, validate.errors.all());
	}

	await new StudentHomeWorDestroy().destroy_by_student_id(req.body.student_id);
	await new StudentDestroy().destroy(req.body.student_id);

	return ApiRes(res, {
		status: HttpStatus.OK
	});
};
