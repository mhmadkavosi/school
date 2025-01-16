import multer from 'multer';
import multerS3 from 'multer-s3';
import path from 'path';
import { v4 } from 'uuid';
import { AppLogger } from '../../logger/Logger';
import { BaseConfig } from '../../../config/base.config';
import S3Client from '../../../config/s3.config';

const configure_limits_and_filter = () => ({
	fileFilter: (req: any, file: any, callback: any) => {
		const imageSizeLimit = 10485760; // 10 MB
		const videoSizeLimit = 30 * 1024 * 1024; // 40 MB
		const audioSizeLimit = 8388608; // 8 MB

		const isImage = ['image/png', 'image/jpg', 'image/jpeg', 'image/webp'].includes(file.mimetype);
		const isVideo = file.mimetype === 'video/mp4';
		const isAudio = ['audio/aac', 'audio/mp3', 'audio/mpeg'].includes(file.mimetype);

		if (
			(isImage && req.headers['content-length'] <= imageSizeLimit) ||
			(isVideo && req.headers['content-length'] <= videoSizeLimit) ||
			(isAudio && req.headers['content-length'] <= audioSizeLimit)
		) {
			callback(null, true);
		} else {
			callback(null, false);
		}
	}
});

export const file_upload = () => {
	try {
		return multer({
			storage: multerS3({
				s3: S3Client.instance(),
				bucket: BaseConfig.BUCKET_NAME,
				metadata: (req, file, cb) => {
					cb(null, { fieldName: file.fieldname });
				},
				acl: 'public-read',
				cacheControl: 'max-age=31536000',
				key: (req, file, cb) => {
					const ext = path.extname(file.originalname);
					// cb(null, `${bucket_name}/${v4()}${ext}`);
					cb(null, `${v4()}${ext}`);
				},
				contentType: multerS3.AUTO_CONTENT_TYPE
			}),
			...configure_limits_and_filter()
		});
	} catch (e) {
		AppLogger.error('Error in file_upload', e);
		return multer({});
	}
};
