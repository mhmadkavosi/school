import { Request, Response } from 'express';
import Validator from 'validatorjs';
import { PreconditionFailedError } from '../../../lib/http/error/precondition_failed.error';
import { HttpStatus } from '../../../lib/http/http_status';
import { ApiRes } from '../../../lib/http/api_response';
import { TeacherInfo } from '../methods/teacher_info';
import { hash_password } from '../../../utils/hashed_id_generetor.utility';
import { TeacherUpdate } from '../methods/teacher_update';
import { ZohoProvider } from '../../../services/mail_provider/liara_provider';
import { get_user_agent } from '../../../utils/user_agent.utility';
import { LogCreate } from '../../log/methods/logs_create';
import { LogTitleEnum } from '../../log/models/enums/log_title.enum';
import { LogTypeEnum } from '../../log/models/enums/log_type.eum';
import { remove_file } from '../../../lib/file_upload/aws/remove';
import { FileDestroy } from '../../file-upload/methods/file/file_destroy';

export const get_total_teacher = async (req: Request, res: Response) => {
	const result = await new TeacherInfo().get_total_teachers();
	return ApiRes(res, {
		status: result.is_success ? HttpStatus.OK : HttpStatus.INTERNAL_SERVER_ERROR,
		data: result.data
	});
};

export const get_total_teacher_section = async (req: Request, res: Response) => {
	const result = await new TeacherInfo().get_teachers_group_by_section();
	return ApiRes(res, {
		status: result.is_success ? HttpStatus.OK : HttpStatus.INTERNAL_SERVER_ERROR,
		data: result.data
	});
};

export const get_all_teacher = async (req: Request, res: Response) => {
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

	const result = await new TeacherInfo().get_teacher_list(Number(req.query.page), Number(req.query.limit));
	return ApiRes(res, {
		status: result.is_success ? HttpStatus.OK : HttpStatus.INTERNAL_SERVER_ERROR,
		data: result.data
	});
};

export const get_by_id = async (req: Request, res: Response) => {
	const result = await new TeacherInfo().get_details(req.params.teacher_id);

	return ApiRes(res, {
		status: result.is_success ? HttpStatus.OK : HttpStatus.INTERNAL_SERVER_ERROR,
		data: result.data
	});
};

export const update_password = async (req: Request, res: Response) => {
	const validate = new Validator(
		{
			teacher_id: req.body.teacher_id,
			new_password: req.body.new_password
		},
		{
			teacher_id: ['required', 'teacher_id'],
			new_password: [
				'required',
				'string',
				'regex:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$/'
			]
		}
	);

	if (validate.fails()) {
		return new PreconditionFailedError(res, validate.errors.all());
	}

	const info = await new TeacherInfo().get_by_id(req.body.teacher_id);

	const new_password = hash_password(req.body.new_password);

	const update = await new TeacherUpdate().add_password(req.body.teacher_id, new_password);

	await new ZohoProvider().send_email(info.data.email, 'Change Password', 'teacher_change_password');

	const user_agent = get_user_agent(req);
	await new LogCreate().createLog(
		'teacher',
		LogTitleEnum.change_password,
		LogTypeEnum.PASSWORD_CHANGE,
		<string>user_agent.ip,
		user_agent.browser ?? 'NA',
		req.body.teacher_id,
		req.admin_id
	);

	return ApiRes(res, {
		status: update.is_success ? HttpStatus.OK : HttpStatus.INTERNAL_SERVER_ERROR
	});
};

export const update_details = async (req: Request, res: Response) => {
	const validate = new Validator(
		{
			teacher_id: req.body.teacher_id,
			name: req.body.name,
			family: req.body.family,
			about: req.body.about,
			major_id: req.body.major_id,
			school_id: req.body.school_id
		},
		{
			name: ['string'],
			family: ['string'],
			about: ['string'],
			major_id: ['string'],
			school_id: ['string'],
			teacher_id: ['required', 'teacher_id']
		}
	);

	if (validate.fails()) {
		return new PreconditionFailedError(res, validate.errors.all());
	}

	const result = await new TeacherUpdate().update_details(
		req.body.teacher_id,
		req.body.name,
		req.body.family,
		req.body.major_id,
		req.body.about,
		req.body.school_id
	);

	return ApiRes(res, {
		status: result.is_success ? HttpStatus.OK : HttpStatus.INTERNAL_SERVER_ERROR
	});
};

export const update_profile_picture = async (req: Request, res: Response) => {
	const validate = new Validator(
		{
			teacher_id: req.body.teacher_id,
			profile_picture: req.body.profile_picture
		},
		{
			teacher_id: ['required', 'string'],
			profile_picture: ['required', 'string']
		}
	);

	if (validate.fails()) {
		return new PreconditionFailedError(res, validate.errors.all());
	}

	const result = await new TeacherUpdate().update_profile_picture(
		req.body.teacher_id,
		req.body.profile_picture
	);

	return ApiRes(res, {
		status: result.is_success ? HttpStatus.OK : HttpStatus.NOT_FOUND
	});
};

export const delete_profile_picture = async (req: Request, res: Response) => {
	const teacher = await new TeacherInfo().get_by_id(req.body.teacher_id);

	remove_file(teacher.data.profile_picture);
	await new FileDestroy().destroy_for_admin(teacher.data.profile_picture);
	const result = await new TeacherUpdate().delete_profile_picture(req.body.teacher_id);

	return ApiRes(res, {
		status: result.is_success ? HttpStatus.OK : HttpStatus.NOT_FOUND
	});
};

export const email_update = async (req: Request, res: Response) => {
	const validate = new Validator(
		{
			teacher_id: req.body.teacher_id,
			email: req.body.email
		},
		{
			teacher_id: ['required', 'string'],
			email: ['required', 'string']
		}
	);

	if (validate.fails()) {
		return new PreconditionFailedError(res, validate.errors.all());
	}

	const result = await new TeacherUpdate().update_email(req.body.teacher_id, req.body.email);

	return ApiRes(res, {
		status: result.is_success ? HttpStatus.OK : HttpStatus.INTERNAL_SERVER_ERROR
	});
};

export const phone_number_update = async (req: Request, res: Response) => {
	const validate = new Validator(
		{
			phone_number: req.body.phone_number,
			teacher_id: req.body.teacher_id
		},
		{
			phone_number: [
				'required',
				'string',
				'regex:/(98|0|98|0098)?([]|-|[()]){0,2}[0]9[0-9]([]|-|[()]){0,2}(?:[0-9]([]|-|[()]){0,2}){8}/'
			],
			teacher_id: ['required', 'string']
		}
	);

	if (validate.fails()) {
		return new PreconditionFailedError(res, validate.errors.all());
	}

	const result = await new TeacherUpdate().update_phone_number(req.body.teacher_id, req.body.phone_number);

	return ApiRes(res, {
		status: result.is_success ? HttpStatus.OK : HttpStatus.INTERNAL_SERVER_ERROR
	});
};
