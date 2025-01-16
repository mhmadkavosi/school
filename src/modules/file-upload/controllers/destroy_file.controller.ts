import { ForbiddenError } from '../../../lib/http/error/forbidden.error';
import { remove_file } from '../../../lib/file_upload/aws/remove';
import { FileDestroy } from '../methods/file/file_destroy';
import { FileInfo } from '../methods/file/file_info';
import { PreconditionFailedError } from '../../../lib/http/error/precondition_failed.error';
import { Response } from 'express';
import Validator from 'validatorjs';
import { ApiRes } from '../../../lib/http/api_response';
import { InternalServerError } from '../../../lib/http/error/internal_server.error';
import { AppLogger } from '../../../lib/logger/Logger';
import { HttpStatus } from '../../../lib/http/http_status';

export const destroy_file = async (req: any, res: Response) => {
	try {
		const validate = new Validator({ url: req.body.url }, { url: ['required', 'string'] });

		if (validate.fails()) {
			return new PreconditionFailedError(res, validate.errors.all());
		}

		const file_info = await new FileInfo().get_by_url(req.body.url, null);

		if (file_info.is_success && file_info.data) {
			new FileDestroy()
				.destroy_for_admin(req.body.url)
				.then(async (result: { is_success: any }) => {
					if (result.is_success) {
						const remove = await remove_file(file_info.data.file_key);

						return ApiRes(res, {
							status: remove?.$metadata?.httpStatusCode ?? HttpStatus.INTERNAL_SERVER_ERROR
						});
					} else {
						return new ForbiddenError(res);
					}
				})
				.catch((e) => {
					AppLogger.error(`error in remove file`, e);
					return new InternalServerError(res);
				});
		}
	} catch (error) {
		AppLogger.error(`error in ${req.body.url} delete file`, error);
		return new InternalServerError(res);
	}
};
