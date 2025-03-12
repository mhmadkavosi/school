import { Request, Response } from 'express';
import Validator from 'validatorjs';
import { PreconditionFailedError } from '../../../lib/http/error/precondition_failed.error';
import { ForbiddenError } from '../../../lib/http/error/forbidden.error';
import { generate_public_id, validate_password } from '../../../utils/hashed_id_generetor.utility';
import { BadRequestError } from '../../../lib/http/error/bad_request.error';
import { get_user_agent } from '../../../utils/user_agent.utility';
import { add_day } from '../../../utils/date_generator.utility';
import { BaseConfig } from '../../../config/base.config';
import { ApiRes } from '../../../lib/http/api_response';
import { InternalServerError } from '../../../lib/http/error/internal_server.error';
import { HttpStatus } from '../../../lib/http/http_status';
import { LogCreate } from '../../log/methods/logs_create';
import { LogTitleEnum } from '../../log/models/enums/log_title.enum';
import { LogTypeEnum } from '../../log/models/enums/log_type.eum';
import { StudentInfo } from '../../student/methods/student_info';
import { StudentTokenBuilder } from '../methods/user_token/student_token.builder';
import { StudentJwtUtility } from '../../../utils/student_jwt.utility';
import { StudentTokenRemove } from '../methods/user_token/student_token_remove';

export const login: any = async (req: Request, res: Response) => {
	const validate = new Validator(
		{
			email: req.body.email,
			password: req.body.password
		},
		{
			email: ['required', 'string', 'email'],
			password: ['string', 'required']
		}
	);

	if (validate.fails()) {
		return new PreconditionFailedError(res, validate.errors.all());
	}

	const student_info = await new StudentInfo().get_by_email(req.body.email);

	if (!student_info.is_success || !student_info.data) {
		return new BadRequestError(res, 'username or password wrong');
	}

	if (!student_info.data?.is_active) {
		return new ForbiddenError(res, 'Account is suspend !');
	}

	const check_password = await validate_password(req.body.password, student_info.data.password);

	if (!check_password) {
		return new BadRequestError(res, 'username or password wrong');
	}

	const user_agent = get_user_agent(req);

	const token_id = generate_public_id();

	const student_token = await new StudentTokenBuilder()
		.setStudentId(student_info.data.id)
		.setUserAgent(user_agent.user_agent ?? 'NA')
		.setPlatform(user_agent.api_platform)
		.setOs(user_agent.os)
		.setLastActivity(new Date())
		.setIp(<string>user_agent.ip)
		.setExpireAt(add_day(1))
		.setDeviceName(user_agent.browser ?? 'NA')
		.setTokenId(token_id)
		.setApiVersion(BaseConfig.VERSION)
		.build();

	if (!student_token.is_success || !student_info.data) {
		return new InternalServerError(res);
	}

	const token = StudentJwtUtility.create(student_info.data.id, token_id);

	await new LogCreate().createLog(
		'student',
		LogTitleEnum.login,
		LogTypeEnum.LOGIN,
		<string>user_agent.ip,
		user_agent.browser ?? 'NA',
		student_info.data.id
	);

	return ApiRes(res, {
		status: token ? HttpStatus.OK : HttpStatus.INTERNAL_SERVER_ERROR,
		data: {
			token: token
		}
	});
};

export const logout = async (req: Request, res: Response) => {
	const result = await new StudentTokenRemove().remove_student_token_by_student_id_and_token_id(
		req.token_id,
		req.student_id
	);

	const user_agent = get_user_agent(req);

	await new LogCreate().createLog(
		'student',
		LogTitleEnum.logout,
		LogTypeEnum.LOGOUT,
		<string>user_agent.ip,
		user_agent.browser ?? 'NA',
		req.student_id
	);

	return ApiRes(res, <RestApi.ResInterface>{
		status: result.is_success ? HttpStatus.OK : HttpStatus.INTERNAL_SERVER_ERROR
	});
};
