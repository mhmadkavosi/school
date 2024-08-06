import { Request, Response } from 'express';

import Validator from 'validatorjs';
import { TeacherInfo } from '../methods/teacher/teacher_info';
import { TeacherUpdate } from '../methods/teacher/teacher_update';
import { PreconditionFailedError } from '../../../lib/http/error/precondition_failed.error';
import { BadRequestError } from '../../../lib/http/error/bad_request.error';
import {
	generate_access_address,
	hash_password,
	validate_password
} from '../../../utils/hashed_id_generetor.utility';
import { generate_random_code } from '../../../utils/random_generator.utility';
import { AuthRequestManager, RequestType } from '../../auth/methods/requests/request_manager';
import { InternalServerError } from '../../../lib/http/error/internal_server.error';
import { HttpStatus } from '../../../lib/http/http_status';
import { ApiRes } from '../../../lib/http/api_response';

export const request_update_phone_number = async (req: Request, res: Response) => {
	const validate = new Validator(
		{
			phone_number: req.body.phone_number
		},
		{
			phone_number: [
				'required',
				'string',
				'regex:/(98|0|98|0098)?([]|-|[()]){0,2}[0]9[0-9]([]|-|[()]){0,2}(?:[0-9]([]|-|[()]){0,2}){8}/'
			]
		}
	);

	if (validate.fails()) {
		return new PreconditionFailedError(res, validate.errors.all());
	}

	const phone_info = await new TeacherInfo().get_by_phone_number(req.body.phone_number);

	if (phone_info.is_success) {
		return new BadRequestError(res, 'this phone is already in user');
	}

	const access_address = generate_access_address();
	const code = await generate_random_code(6);
	const result = await new AuthRequestManager().add_request(RequestType.change_phone_number, access_address, {
		code: code,
		value: req.body.phone_number
	});

	if (result === 'NOK') {
		return new InternalServerError(res);
	}

	return ApiRes(res, {
		status: HttpStatus.OK,
		data: {
			access_address: access_address
		}
	});
};

export const phone_number_confirm = async (req: Request, res: Response) => {
	const validate = new Validator(
		{
			confirm_code: req.body.confirm_code,
			access_address: req.body.access_address
		},
		{
			confirm_code: ['required', 'string'],
			access_address: ['required', 'string']
		}
	);

	if (validate.fails()) {
		return new PreconditionFailedError(res, validate.errors.all());
	}

	const request_info = await new AuthRequestManager().get_request(
		RequestType.change_phone_number,
		req.body.access_address
	);
	if (request_info === null) {
		return new BadRequestError(res, 'Expired!');
	}

	if (request_info.code !== req.body.confirm_code) {
		return new BadRequestError(res, 'Code is wrong!');
	}

	await new AuthRequestManager().remove_request(RequestType.change_phone_number, req.body.access_address);

	const result = await new TeacherUpdate().update_phone_number(req.user_id, request_info.value);

	return ApiRes(res, {
		status: result.is_success ? HttpStatus.OK : HttpStatus.INTERNAL_SERVER_ERROR
	});
};

export const request_update_email = async (req: Request, res: Response) => {
	const validate = new Validator(
		{
			email: req.body.email
		},
		{
			email: ['required', 'string', 'email']
		}
	);

	if (validate.fails()) {
		return new PreconditionFailedError(res, validate.errors.all());
	}

	const phone_info = await new TeacherInfo().get_by_email(req.body.email);

	if (phone_info.is_success) {
		return new BadRequestError(res, 'this email is already in user');
	}

	const access_address = generate_access_address();
	const code = await generate_random_code(6);
	const result = await new AuthRequestManager().add_request(RequestType.change_email, access_address, {
		code: code,
		value: req.body.email
	});

	if (result === 'NOK') {
		return new InternalServerError(res);
	}

	return ApiRes(res, {
		status: HttpStatus.OK,
		data: {
			access_address: access_address
		}
	});
};

export const email_confirm = async (req: Request, res: Response) => {
	const validate = new Validator(
		{
			confirm_code: req.body.confirm_code,
			access_address: req.body.access_address
		},
		{
			confirm_code: ['required', 'string'],
			access_address: ['required', 'string']
		}
	);

	if (validate.fails()) {
		return new PreconditionFailedError(res, validate.errors.all());
	}

	const request_info = await new AuthRequestManager().get_request(
		RequestType.change_email,
		req.body.access_address
	);
	if (request_info === null) {
		return new BadRequestError(res, 'Expired!');
	}

	if (request_info.code !== req.body.confirm_code) {
		return new BadRequestError(res, 'Code is wrong!');
	}

	await new AuthRequestManager().remove_request(RequestType.change_email, req.body.access_address);

	const result = await new TeacherUpdate().update_email(req.user_id, request_info.value);

	return ApiRes(res, {
		status: result.is_success ? HttpStatus.OK : HttpStatus.INTERNAL_SERVER_ERROR
	});
};

export const update_profile_picture = async (req: Request, res: Response) => {
	const validate = new Validator(
		{
			profile_picture: req.body.profile_picture
		},
		{
			profile_picture: ['required', 'string']
		}
	);

	if (validate.fails()) {
		return new PreconditionFailedError(res, validate.errors.all());
	}

	const result = await new TeacherUpdate().update_profile_picture(req.user_id, req.body.profile_picture);

	return ApiRes(res, {
		status: result.is_success ? HttpStatus.OK : HttpStatus.NOT_FOUND
	});
};

export const update_details = async (req: Request, res: Response) => {
	const validate = new Validator(
		{
			name: req.body.name,
			family: req.body.family,
			about: req.body.about,
			major_id: req.body.major_id
		},
		{
			name: ['string'],
			family: ['string'],
			about: ['string'],
			major_id: ['string']
		}
	);

	if (validate.fails()) {
		return new PreconditionFailedError(res, validate.errors.all());
	}

	const result = await new TeacherUpdate().update_details(
		req.user_id,
		req.body.name,
		req.body.family,
		req.body.major_id,
		req.body.about
	);

	return ApiRes(res, {
		status: result.is_success ? HttpStatus.OK : HttpStatus.NOT_FOUND
	});
};

export const update_password = async (req: Request, res: Response) => {
	const validate = new Validator(
		{
			old_password: req.body.old_password,
			new_password: req.body.new_password
		},
		{
			old_password: [
				'required',
				'string',
				'regex:/^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{8,}$/'
			],
			new_password: [
				'required',
				'string',
				'regex:/^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{8,}$/'
			]
		}
	);

	if (validate.fails()) {
		return new PreconditionFailedError(res, validate.errors.all());
	}

	const info = await new TeacherInfo().get_by_id(req.user_id);

	const check_password = await validate_password(req.body.old_password, info.data.password);

	if (!check_password) {
		return new BadRequestError(res, 'password is wrong');
	}

	const new_password = hash_password(req.body.new_password);

	const update = await new TeacherUpdate().add_password(req.user_id, new_password);

	return ApiRes(res, {
		status: update.is_success ? HttpStatus.OK : HttpStatus.INTERNAL_SERVER_ERROR
	});
};

export const get_by_id = async (req: Request, res: Response) => {
	const result = await new TeacherInfo().get_by_id(req.user_id);
	return ApiRes(res, {
		status: result.is_success ? HttpStatus.OK : HttpStatus.INTERNAL_SERVER_ERROR,
		data: result.data
	});
};