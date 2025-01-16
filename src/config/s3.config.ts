import { AppLogger } from '../lib/logger/Logger';
import { S3 } from '@aws-sdk/client-s3';

class S3Client {
	private static _instance: S3;

	private constructor() {
		try {
			S3Client._instance = new S3({
				credentials: {
					accessKeyId: process.env.AWS_ID,
					secretAccessKey: process.env.AWS_SECRET
				},
				region: 'default',
				forcePathStyle: true,
				endpoint: process.env.AWS_ENDPOINT
			});

			AppLogger.info(' s3 client connected');
		} catch (e) {
			AppLogger.error('error in S3Client', e);
		}
	}

	public static instance(): S3 {
		if (!S3Client._instance) {
			new S3Client();
		}

		return S3Client._instance;
	}
}

export default S3Client;
