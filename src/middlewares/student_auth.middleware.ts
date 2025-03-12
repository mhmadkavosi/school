import { AppLogger } from '../lib/logger/Logger';
import { NextFunction, Request, Response } from 'express';
import { UnauthorizedError } from '../lib/http/error/unauthorized.error';
import { app_cache } from '../config/cache.config';
import { StudentJwtUtility } from '../utils/student_jwt.utility';
import { StudentTokenInfo } from '../modules/student-auth/methods/user_token/student_token_info';
import { StudentTokenUpdate } from '../modules/student-auth/methods/user_token/student_token_update';

export const StudentAuthMiddleware = async (req: Request, res: Response, next: NextFunction) => {
	try {
		if (!req.headers?.authorization || !req.headers.authorization.startsWith('Bearer ')) {
			return new UnauthorizedError(res);
		}

		const token = req.headers.authorization.slice(7);

		if (!token) {
			return new UnauthorizedError(res);
		}

		const jwt_data = StudentJwtUtility.verify(req);
		console.log(jwt_data);
		if (!jwt_data) {
			return new UnauthorizedError(res);
		}

		let student_token_info: any | RestApi.ObjectResInterface = null;

		student_token_info = app_cache().get(jwt_data.student_token_id);

		if (!student_token_info) {
			student_token_info = await new StudentTokenInfo().get_student_token_by_student_and_token_id(
				jwt_data.student_id,
				jwt_data.student_token_id
			);

			const differenceInMilliseconds: any = new Date(jwt_data.expire_at).getTime() - new Date().getTime();

			app_cache().set(jwt_data.student_token_id, student_token_info, differenceInMilliseconds);
		}

		if (!student_token_info.is_success || !student_token_info.data) {
			return new UnauthorizedError(res);
		}

		new StudentTokenUpdate().update_last_activity_by_token_id(jwt_data.student_token_id).catch((e: any) => {
			AppLogger.error('error in StudentAuthMiddleware : StudentTokenUpdate', e);
		});

		req.student_id = jwt_data.student_id;
		req.token_id = jwt_data.student_token_id;
		return next();
	} catch (e: any) {
		AppLogger.error('Error in StudentAuthMiddleware', e);
		return next(new Error(e));
	}
};
