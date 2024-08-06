import { Request, Response } from 'express';
import Validator from 'validatorjs';
import { AuthRequestManager, RequestType } from '../methods/requests/request_manager';

import { TeacherTokenBuilder } from '../methods/teacher/teacher_token.builder';
import { PreconditionFailedError } from '../../../lib/http/error/precondition_failed.error';
import { TeacherInfo } from '../../teacher/methods/teacher/teacher_info';
import { BadRequestError } from '../../../lib/http/error/bad_request.error';
import { generate_random_code } from '../../../utils/random_generator.utility';
import {
	generate_access_address,
	generate_public_id,
	hash_password
} from '../../../utils/hashed_id_generetor.utility';
import { HttpStatus } from '../../../lib/http/http_status';
import { InternalServerError } from '../../../lib/http/error/internal_server.error';
import { ApiRes } from '../../../lib/http/api_response';
import { TeacherCreate } from '../../teacher/methods/teacher/teacher_create';
import { TeacherUpdate } from '../../teacher/methods/teacher/teacher_update';
import { get_user_agent } from '../../../utils/user_agent.utility';
import { add_day } from '../../../utils/date_generator.utility';
import { BaseConfig } from '../../../config/base.config';
import { TeacherJwtUtility } from '../../../utils/teacher_jwt.utility';

export const register_request = async (req: Request, res: Response) => {
	const validate = new Validator(
		{
			email: req.body.email,
			name: req.body.name,
			family: req.body.family
		},
		{
			email: ['required', 'email'],
			name: ['required', 'string'],
			family: ['required', 'string']
		}
	);

	if (validate.fails()) {
		return new PreconditionFailedError(res, validate.errors.all());
	}

	const info_by_email = await new TeacherInfo().get_by_email(req.body.email);

	if (info_by_email.is_success) {
		return new BadRequestError(res, 'This email already sign have account');
	}
	const access_address = generate_access_address();
	const code = await generate_random_code(6);
	const result = await new AuthRequestManager().add_request(RequestType.register, access_address, {
		code: code,
		value: req.body.email,
		name: req.body.name,
		family: req.body.family
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

export const register_confirm = async (req: Request, res: Response) => {
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
		RequestType.register,
		req.body.access_address
	);
	if (request_info === null) {
		return new BadRequestError(res, 'Expired!');
	}
	if (request_info.name && request_info.value && request_info.family) {
		if (request_info.code !== req.body.confirm_code) {
			return new BadRequestError(res, 'Code is wrong!');
		}

		const result = await new TeacherCreate().create(
			request_info.value,
			request_info?.name,
			request_info?.family
		);

		if (!result.is_success) {
			return new InternalServerError(res);
		}

		await new AuthRequestManager().remove_request(RequestType.register, req.body.access_address);

		return ApiRes(res, {
			status: HttpStatus.OK,
			data: result.data
		});
	} else {
		return new InternalServerError(res);
	}
};
// TODO : fix that for leave the site and not enter password
export const confirm_password = async (req: Request, res: Response) => {
	const validate = new Validator(
		{
			teacher_id: req.body.teacher_id,
			password: req.body.password,
			confirm_password: req.body.confirm_password
		},
		{
			teacher_id: ['required', 'string'],
			password: [
				'required',
				'string',
				'regex:/^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{8,}$/'
			],
			confirm_password: [
				'required',
				'string',
				'regex:/^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{8,}$/'
			]
		}
	);

	if (validate.fails()) {
		return new PreconditionFailedError(res, validate.errors.all());
	}

	const teacher_info = await new TeacherInfo().get_by_id(req.body.teacher_id);

	if (!teacher_info.is_success) {
		return new BadRequestError(res);
	}

	if (req.body.password !== req.body.confirm_password) {
		return new BadRequestError(res, 'Passwords not match');
	}

	const add_password = await new TeacherUpdate().add_password(
		req.body.teacher_id,
		hash_password(req.body.password)
	);
	if (!add_password.is_success) {
		return new InternalServerError(res);
	}

	const user_agent = get_user_agent(req);

	const token_id = generate_public_id();

	const teacher_token = await new TeacherTokenBuilder()
		.setTeacherId(teacher_info.data.id)
		.setUserAgent(user_agent.user_agent ?? 'NA')
		.setPlatform(user_agent.api_platform)
		.setOs(user_agent.os)
		.setLastActivity(new Date())
		.setIp(<string>user_agent.ip)
		.setExpireAt(add_day(10))
		.setDeviceName(user_agent.browser ?? 'NA')
		.setTokenId(token_id)
		.setApiVersion(BaseConfig.VERSION)
		.build();

	if (!teacher_token.is_success || !teacher_info.data) {
		return new InternalServerError(res);
	}

	const token = TeacherJwtUtility.create(teacher_info.data.id, token_id);

	return ApiRes(res, {
		status: token ? HttpStatus.OK : HttpStatus.INTERNAL_SERVER_ERROR,
		data: {
			token: token
		}
	});
};