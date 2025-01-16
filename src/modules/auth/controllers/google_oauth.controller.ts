import { Request, Response } from 'express';
import { get_user_agent } from '../../../utils/user_agent.utility';
import Validator from 'validatorjs';
import { ApiRes } from '../../../lib/http/api_response';
import { GoogleOAuthService } from '../../../utils/google_oauth.service';
import { TeacherInfo } from '../../teacher/methods/teacher_info';
import { generate_public_id } from '../../../utils/hashed_id_generetor.utility';
import { TeacherTokenBuilder } from '../methods/teacher/teacher_token.builder';
import { add_day } from '../../../utils/date_generator.utility';
import { BaseConfig } from '../../../config/base.config';
import { InternalServerError } from '../../../lib/http/error/internal_server.error';
import { TeacherJwtUtility } from '../../../utils/teacher_jwt.utility';
import { HttpStatus } from '../../../lib/http/http_status';
import { PreconditionFailedError } from '../../../lib/http/error/precondition_failed.error';
import { TeacherCreate } from '../../teacher/methods/teacher_create';

export const google_auth = async (req: Request, res: Response) => {
	const validate = new Validator(
		{
			access_token: req.body.access_token
		},
		{
			access_token: ['required', 'string']
		}
	);

	if (validate.fails()) {
		return new PreconditionFailedError(res, validate.errors.all());
	}
	// console.log(req.query);

	// const info = await new GoogleOAuthService().getAccessTokenFromCode(<string>req.query.code);

	// console.log(info);

	const user_info_from_google = await new GoogleOAuthService().getGoogleUserInfo(req.body.access_token);
	if (!user_info_from_google.is_success) {
		return ApiRes(res, {
			status: 500,
			msg: 'google api user info failed'
		});
	}
	// id: '114387358782772362238',
	// email: 'mraroow@gmail.com',
	// verified_email: true,
	// name: 'Mr aroow',
	// given_name: 'Mr',
	// family_name: 'aroow',
	// picture: 'https://lh3.googleusercontent.com/a/AGNmyxZgyzgcmL2bLadLd1bzl-RPqmXyREw-jTeZbcKv=s96-c',
	// locale: 'fa'
	const teacher_info = await new TeacherInfo().get_by_email(user_info_from_google.data.email);
	if (teacher_info.is_success) {
		// login
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
	} else {
		// register
		const teacher_info = await new TeacherCreate().create(
			user_info_from_google.data.email,
			user_info_from_google.data.given_name,
			user_info_from_google.data.family_name
		);

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
	}
};
