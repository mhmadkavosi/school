import { hash_password } from './../../../utils/hashed_id_generetor.utility';
import { Request, Response } from 'express';
import Validator from 'validatorjs';
import { ApiRes } from '../../../lib/http/api_response';
import { HttpStatus } from '../../../lib/http/http_status';
import { PreconditionFailedError } from '../../../lib/http/error/precondition_failed.error';
import { StudentBuilder } from '../methods/student.builder';
import { StudentInfo } from '../methods/student_info';

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
