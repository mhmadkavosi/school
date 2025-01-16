import { Request, Response } from 'express';
import Validator from 'validatorjs';
import { PreconditionFailedError } from '../../../lib/http/error/precondition_failed.error';
import { HttpStatus } from '../../../lib/http/http_status';
import { ApiRes } from '../../../lib/http/api_response';
import { remove_file } from '../../../lib/file_upload/aws/remove';
import { FileDestroy } from '../../file-upload/methods/file/file_destroy';
import { HomeWorkFilesCreate } from '../methods/home_work_files/home_work_files_create';
import { HomeWorkFilesDestroy } from '../methods/home_work_files/home_work_files_destroy';
import { HomeWorkFilesInfo } from '../methods/home_work_files/home_work_files_info';

export const update_file = async (req: Request, res: Response) => {
	const validate = new Validator(
		{
			home_work_id: req.body.home_work_id,
			file: req.body.file,
			file_type: req.body.file_type
		},
		{
			home_work_id: ['required', 'string'],
			file: ['string', 'required'],
			file_type: ['string', 'required']
		}
	);

	if (validate.fails()) {
		return new PreconditionFailedError(res, validate.errors.all());
	}

	const update_is_active = await new HomeWorkFilesCreate().create(
		req.body.home_work_id,
		req.body.file,
		req.body.file_type
	);

	return ApiRes(res, <RestApi.ResInterface>{
		status: update_is_active.is_success ? HttpStatus.OK : HttpStatus.INTERNAL_SERVER_ERROR
	});
};

export const delete_file = async (req: Request, res: Response) => {
	const validate = new Validator(
		{
			home_work_id: req.body.home_work_id,
			file_id: req.body.file_id
		},
		{
			home_work_id: ['required', 'string'],
			file_id: ['required', 'string']
		}
	);

	if (validate.fails()) {
		return new PreconditionFailedError(res, validate.errors.all());
	}

	const original_data = await new HomeWorkFilesInfo().get_info_by_id(req.body.file_id);

	remove_file(original_data.data.file);
	await new FileDestroy().destroy_for_admin(original_data.data.file);
	const update_is_active = await new HomeWorkFilesDestroy().destroy(req.body.home_work_id, req.body.file_id);

	return ApiRes(res, <RestApi.ResInterface>{
		status: update_is_active.is_success ? HttpStatus.OK : HttpStatus.INTERNAL_SERVER_ERROR
	});
};
