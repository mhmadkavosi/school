import { DeleteObjectCommand } from '@aws-sdk/client-s3';

import { BaseConfig } from '../../../config/base.config';
import { AppLogger } from '../../logger/Logger';
import S3Client from '../../../config/s3.config';

export const remove_file = async (file_key: string) => {
	try {
		const params = {
			Bucket: BaseConfig.BUCKET_NAME,
			Key: file_key
		};
		const command = new DeleteObjectCommand(params);
		return await S3Client.instance().send(command);
	} catch (e) {
		AppLogger.error('Error in remove_file', e);
		return null;
	}
};
