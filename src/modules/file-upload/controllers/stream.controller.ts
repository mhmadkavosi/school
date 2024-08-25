import { InternalServerError } from '../../../lib/http/error/internal_server.error';
import { ApiRes } from '../../../lib/http/api_response';
import { BaseConfig } from '../../../config/base.config';
import { Response } from 'express';
import { FileCrate } from '../methods/file/file_create';
import { HttpStatus } from '../../../lib/http/http_status';
import { AppLogger } from '../../../lib/logger/Logger';

export const stream = async (req: any, res: Response) => {
	try {
		new FileCrate()
			.save(
				BaseConfig.BUCKET_DOMAIN_URL + '/file/' + req.file.key,
				req.file.bucket,
				null,
				req.file.key,
				req.file.size,
				req.file.mimetype
			)
			.then(() => {
				return ApiRes(res, {
					status: HttpStatus.OK,
					data: {
						path: BaseConfig.BUCKET_DOMAIN_URL + '/file/' + req.file.key,
						size: req.file.size,
						mime_type: req.file.mimetype,
						content_type: req.file.contentType
					}
				});
			})
			.catch((e) => {
				AppLogger.error(`error in create file record`, e);
				return new InternalServerError(res);
			});
	} catch (e) {
		AppLogger.error(`error in upload file `, e);
		return new InternalServerError(res);
	}
};
