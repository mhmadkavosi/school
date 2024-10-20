import {
	generate_access_address,
	generate_public_id,
	validate_password
} from './../../../utils/hashed_id_generetor.utility';
import { Request, Response } from 'express';
import Validator from 'validatorjs';
import { AuthRequestManager, RequestType } from '../methods/requests/request_manager';

import { TeacherTokenBuilder } from '../methods/teacher/teacher_token.builder';
import { PreconditionFailedError } from '../../../lib/http/error/precondition_failed.error';
import { BadRequestError } from '../../../lib/http/error/bad_request.error';
import { generate_random_code } from '../../../utils/random_generator.utility';
import { InternalServerError } from '../../../lib/http/error/internal_server.error';
import { HttpStatus } from '../../../lib/http/http_status';
import { ApiRes } from '../../../lib/http/api_response';
import { get_user_agent } from '../../../utils/user_agent.utility';
import { add_day } from '../../../utils/date_generator.utility';
import { BaseConfig } from '../../../config/base.config';
import { TeacherJwtUtility } from '../../../utils/teacher_jwt.utility';
import { TeacherInfo } from '../../teacher/methods/teacher_info';
import { EmailProvider } from '../../../utils/mail.service';
import { ZohoProvider } from '../../../services/mail_provider/liara_provider';

export const login_request = async (req: Request, res: Response) => {
	const validate = new Validator(
		{
			email: req.body.email,
			password: req.body.password
		},
		{
			email: ['required', 'email'],
			password: [
				'required',
				'string',
				'regex:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$/'
			]
		}
	);

	if (validate.fails()) {
		return new PreconditionFailedError(res, validate.errors.all());
	}

	const info_by_email = await new TeacherInfo().get_by_email(req.body.email);
	if (!info_by_email.is_success) {
		return new BadRequestError(res, 'This email not have account');
	}
	const check_password = await validate_password(req.body.password, info_by_email.data.password);

	if (!check_password) {
		return new BadRequestError(res, 'Password is wrong');
	}

	const access_address = generate_access_address();
	const code = await generate_random_code(6);
	const result = await new AuthRequestManager().add_request(RequestType.login, access_address, {
		code: String(code),
		value: req.body.email
	});

	if (result === 'NOK') {
		return new InternalServerError(res);
	}

	// const send_email = await new EmailProvider().send_email(
	// 	req.body.email,
	// 	'Teacher Login',
	// 	'teacher_email.template',
	// 	String(code)
	// );

	const send_email = await new ZohoProvider().send_email(req.body.email, 'Your Otp code', 'teacher_login', {
		login_code: code
	});

	console.log(code);
	if (!send_email) {
		return ApiRes(res, {
			status: HttpStatus.INTERNAL_SERVER_ERROR,
			msg: 'email send failed'
		});
	}

	return ApiRes(res, {
		status: HttpStatus.OK,
		data: {
			access_address: access_address
		}
	});
};

export const login_confirm = async (req: Request, res: Response) => {
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

	const request_info = await new AuthRequestManager().get_request(RequestType.login, req.body.access_address);
	if (request_info === null) {
		return new BadRequestError(res, 'Expired!');
	}

	if (request_info.code !== req.body.confirm_code) {
		return new BadRequestError(res, 'Code is wrong!');
	}

	const teacher_info = await new TeacherInfo().get_by_email(request_info.value);

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
	await new AuthRequestManager().remove_request(RequestType.login, req.body.access_address);

	return ApiRes(res, {
		status: token ? HttpStatus.OK : HttpStatus.INTERNAL_SERVER_ERROR,
		data: {
			token: token
		}
	});
};
