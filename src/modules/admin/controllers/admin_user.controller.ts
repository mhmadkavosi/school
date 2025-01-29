import { Request, Response } from 'express';
import Validator from 'validatorjs';
import { AdminInfo } from '../methods/admin/admin_info';
import { AdminBuilder } from '../methods/admin/admin.builder';
import { AdminUpdate } from '../methods/admin/admin_update';
import { AdminTokenRemove } from '../../admin-auth/methods/user_token/admin_token_remove';
import { ApiRes } from '../../../lib/http/api_response';
import { HttpStatus } from '../../../lib/http/http_status';
import { PreconditionFailedError } from '../../../lib/http/error/precondition_failed.error';
import { InternalServerError } from '../../../lib/http/error/internal_server.error';
import { hash_password } from '../../../utils/hashed_id_generetor.utility';

import { app_cache } from '../../../config/cache.config';

export const get_admin_info = async (req: Request, res: Response) => {
	const admin_info = await new AdminInfo().get_by_id(req.user_id);

	return ApiRes(res, <RestApi.ResInterface>{
		status: admin_info.is_success ? HttpStatus.OK : HttpStatus.INTERNAL_SERVER_ERROR,
		data: admin_info.data
	});
};

export const get_all_admin = async (req: Request, res: Response) => {
	const validate = new Validator(
		{
			page: req.query.page,
			limit: req.query.limit,
			national_code: req.query.national_code,
			name: req.query.name,
			family: req.query.family,
			email: req.query.email
		},
		{
			page: ['numeric', 'required'],
			limit: ['numeric', 'required'],
			national_code: ['string'],
			name: ['string'],
			family: ['string'],
			email: ['string']
		}
	);

	if (validate.fails()) {
		return new PreconditionFailedError(res, validate.errors.all());
	}

	const all_admin = await new AdminInfo().get_all_admins(
		Number(req.query.page),
		Number(req.query.limit),
		<string>req.query.national_code,
		<string>req.query.name,
		<string>req.query.family,
		<string>req.query.email
	);

	return ApiRes(res, <RestApi.ResInterface>{
		status: all_admin.is_success ? HttpStatus.OK : HttpStatus.INTERNAL_SERVER_ERROR,
		data: all_admin.data
	});
};

export const get_admin_info_by_admin_id = async (req: Request, res: Response) => {
	const admin_info = await new AdminInfo().get_by_id(req.params.admin_id);

	return ApiRes(res, <RestApi.ResInterface>{
		status: admin_info.is_success ? HttpStatus.OK : HttpStatus.INTERNAL_SERVER_ERROR,
		data: admin_info.data
	});
};

export const create_admin = async (req: Request, res: Response) => {
	const validate = new Validator(
		{
			name: req.body.name,
			family: req.body.family,
			national_code: req.body.national_code,
			password: req.body.password,
			email: req.body.email
		},
		{
			name: ['string', 'required', 'max:120', 'min:4'],
			family: ['string', 'required', 'max:120', 'min:4'],
			national_code: ['required', 'string', 'min:10', 'max:10'],
			password: ['string', 'required', 'min:8'],
			email: ['required', 'string', 'email']
		}
	);

	if (validate.fails()) {
		return new PreconditionFailedError(res, validate.errors.all());
	}

	const admin_phone_info = await new AdminInfo().get_by_email(req.body.email);
	if (admin_phone_info.is_success) {
		return ApiRes(res, {
			status: HttpStatus.BAD_REQUEST,
			msg: 'This admin with this phone number is already exists'
		});
	}

	const admin_national_info = await new AdminInfo().get_by_national_code(req.body.national_code);
	if (admin_national_info.is_success) {
		return ApiRes(res, {
			status: HttpStatus.BAD_REQUEST,
			msg: 'This admin with this national code is already exists'
		});
	}

	const create = await new AdminBuilder()
		.setFamily(req.body.family)
		.setName(req.body.name)
		.setNationalCode(req.body.national_code)
		.setPassword(req.body.password)
		.setEmail(req.body.email)
		.build();

	if (create.is_success && create.data) {
		return ApiRes(res, <RestApi.ResInterface>{
			status: HttpStatus.OK,
			data: create.data
		});
	}

	return ApiRes(res, <RestApi.ResInterface>{
		status: HttpStatus.INTERNAL_SERVER_ERROR
	});
};

export const update_is_active = async (req: Request, res: Response) => {
	const validate = new Validator(
		{
			admin_id: req.body.admin_id,
			is_active: req.body.is_active
		},
		{
			admin_id: ['required', 'string'],
			is_active: ['string', 'required']
		}
	);

	if (validate.fails()) {
		return new PreconditionFailedError(res, validate.errors.all());
	}

	const update_is_active = await new AdminUpdate().update_is_active(req.body.admin_id, req.body.is_active);

	if (update_is_active.is_success && req.body.is_active == 'false') {
		app_cache(0).del(req.token_id);
		new AdminTokenRemove().remove_all_tokens_by_user_id(req.body.admin_id);
	}

	return ApiRes(res, <RestApi.ResInterface>{
		status: update_is_active.is_success ? HttpStatus.OK : HttpStatus.INTERNAL_SERVER_ERROR
	});
};

export const update_info = async (req: Request, res: Response) => {
	const validate = new Validator(
		{
			admin_id: req.body.admin_id,
			name: req.body.name,
			family: req.body.family,
			national_code: req.body.national_code,
			email: req.body.email,
			super_admin: req.body.super_admin
		},
		{
			admin_id: ['string', 'required'],
			name: ['string', 'max:120', 'min:4'],
			family: ['string', 'max:120', 'min:4'],
			national_code: ['string'],
			email: ['string'],
			super_admin: ['boolean']
		}
	);

	if (validate.fails()) {
		return new PreconditionFailedError(res, validate.errors.all());
	}

	const update = await new AdminUpdate().update_user_info(
		req.body.admin_id,
		req.body.name,
		req.body.family,
		req.body.national_code,
		req.body.email,
		req.body.super_admin
	);

	return ApiRes(res, <RestApi.ResInterface>{
		status: update.is_success ? HttpStatus.OK : HttpStatus.INTERNAL_SERVER_ERROR
	});
};

export const update_password = async (req: Request, res: Response) => {
	const validate = new Validator(
		{
			new_password: req.body.new_password,
			admin_id: req.body.admin_id
		},
		{
			new_password: ['string', 'required'],
			admin_id: ['string', 'required']
		}
	);

	if (validate.fails()) {
		return new PreconditionFailedError(res, validate.errors.all());
	}

	const admin_info = await new AdminInfo().get_password_by_id(req.body.admin_id);

	if (!admin_info.is_success || !admin_info.data) {
		return new InternalServerError(res);
	}

	const update = await new AdminUpdate().update_password(
		req.body.admin_id,
		hash_password(req.body.new_password)
	);

	return ApiRes(res, <RestApi.ResInterface>{
		status: update.is_success ? HttpStatus.OK : HttpStatus.INTERNAL_SERVER_ERROR
	});
};
