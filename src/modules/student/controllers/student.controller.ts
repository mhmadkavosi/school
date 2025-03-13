import { Request, Response } from 'express';
import Validator from 'validatorjs';
import { ApiRes } from '../../../lib/http/api_response';
import { HttpStatus } from '../../../lib/http/http_status';
import { PreconditionFailedError } from '../../../lib/http/error/precondition_failed.error';
import { StudentInfo } from '../methods/student_info';
import { StudentUpdate } from '../methods/student_update';
import { remove_file } from '../../../lib/file_upload/aws/remove';
import { FileDestroy } from '../../file-upload/methods/file/file_destroy';
import { InternalServerError } from '../../../lib/http/error/internal_server.error';
import { hash_password, validate_password } from '../../../utils/hashed_id_generetor.utility';
import { BadRequestError } from '../../../lib/http/error/bad_request.error';
import { get_user_agent } from '../../../utils/user_agent.utility';
import { LogCreate } from '../../log/methods/logs_create';
import { LogTitleEnum } from '../../log/models/enums/log_title.enum';
import { LogTypeEnum } from '../../log/models/enums/log_type.eum';

export const update = async (req: Request, res: Response) => {
	const validate = new Validator(
		{
			name: req.body.name,
			family: req.body.family,
			email: req.body.email,
			phone: req.body.phone,
			birth_date: req.body.birth_date,
			middle_name: req.body.middle_name
		},
		{
			name: ['string'],
			family: ['string'],
			email: ['email'],
			phone: ['string'],
			birth_date: ['date'],
			middle_name: ['string']
		}
	);

	if (validate.fails()) {
		return new PreconditionFailedError(res, validate.errors.all());
	}

	const result = await new StudentUpdate().update(
		req.student_id,
		req.body.name,
		req.body.family,
		req.body.email,
		req.body.phone,
		req.body.birth_date,
		req.body.middle_name
	);

	const user_agent = get_user_agent(req);
	await new LogCreate().createLog(
		'student',
		LogTitleEnum.profile_change,
		LogTypeEnum.PROFILE_CHANGE,
		<string>user_agent.ip,
		user_agent.browser ?? 'NA',
		req.student_id
	);

	return ApiRes(res, {
		status: result.is_success ? HttpStatus.OK : HttpStatus.INTERNAL_SERVER_ERROR
	});
};

export const get_info = async (req: Request, res: Response) => {
	const result = await new StudentInfo().get_by_id(req.student_id);

	return ApiRes(res, {
		status: result.is_success ? HttpStatus.OK : HttpStatus.INTERNAL_SERVER_ERROR,
		data: result.data
	});
};

export const get_class_of_student = async (req: Request, res: Response) => {
	const result = await new StudentInfo().get_class_of_student(req.student_id);

	return ApiRes(res, {
		status: result.is_success ? HttpStatus.OK : HttpStatus.INTERNAL_SERVER_ERROR,
		data: result.data
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

	const result = await new StudentUpdate().update_profile_picture(req.student_id, req.body.profile_picture);
	const user_agent = get_user_agent(req);
	await new LogCreate().createLog(
		'student',
		LogTitleEnum.profile_change,
		LogTypeEnum.PROFILE_CHANGE,
		<string>user_agent.ip,
		user_agent.browser ?? 'NA',
		req.student_id
	);
	return ApiRes(res, {
		status: result.is_success ? HttpStatus.OK : HttpStatus.INTERNAL_SERVER_ERROR
	});
};

export const delete_profile_picture = async (req: Request, res: Response) => {
	const student = await new StudentInfo().get_by_id(req.student_id);

	remove_file(student.data.profile_picture);
	await new FileDestroy().destroy_for_admin(student.data.profile_picture);
	const result = await new StudentUpdate().delete_profile_picture(req.student_id);
	const user_agent = get_user_agent(req);
	await new LogCreate().createLog(
		'student',
		LogTitleEnum.profile_change,
		LogTypeEnum.PROFILE_CHANGE,
		<string>user_agent.ip,
		user_agent.browser ?? 'NA',
		req.student_id
	);
	return ApiRes(res, {
		status: result.is_success ? HttpStatus.OK : HttpStatus.INTERNAL_SERVER_ERROR
	});
};

export const update_password = async (req: Request, res: Response) => {
	const validate = new Validator(
		{
			old_password: req.body.old_password,

			new_password: req.body.new_password
		},
		{
			old_password: ['required', 'string'],

			new_password: ['string', 'required']
		}
	);

	if (validate.fails()) {
		return new PreconditionFailedError(res, validate.errors.all());
	}

	const student_info = await new StudentInfo().get_by_id(req.student_id);

	if (!student_info.is_success || !student_info.data) {
		return new InternalServerError(res);
	}

	const check_password = await validate_password(req.body.old_password, student_info.data.password);

	if (!check_password) {
		return new BadRequestError(res, 'password is wrong');
	}

	const update = await new StudentUpdate().update_password(
		req.student_id,
		hash_password(req.body.new_password)
	);
	const user_agent = get_user_agent(req);

	await new LogCreate().createLog(
		'student',
		LogTitleEnum.change_password,
		LogTypeEnum.PASSWORD_CHANGE,
		<string>user_agent.ip,
		user_agent.browser ?? 'NA',
		req.student_id
	);

	return ApiRes(res, <RestApi.ResInterface>{
		status: update.is_success ? HttpStatus.OK : HttpStatus.INTERNAL_SERVER_ERROR
	});
};
