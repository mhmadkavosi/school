import { AppLogger } from '../lib/logger/Logger';
import { NextFunction, Request, Response } from 'express';
import { UnauthorizedError } from '../lib/http/error/unauthorized.error';
import { app_cache } from '../config/cache.config';
import { TeacherJwtUtility } from '../utils/teacher_jwt.utility';
import { TeacherTokenInfo } from '../modules/auth/methods/teacher/teacher_token_info';
import { TeacherTokenUpdate } from '../modules/auth/methods/teacher/teacher_token_update';
export const TeacherAuthMiddleware = async (req: Request, res: Response, next: NextFunction) => {
	try {
		if (!req.headers?.authorization || !req.headers.authorization.startsWith('Bearer ')) {
			return new UnauthorizedError(res);
		}

		const token = req.headers.authorization.slice(7);

		if (!token) {
			return new UnauthorizedError(res);
		}

		const jwt_data = TeacherJwtUtility.verify(req);
		if (!jwt_data) {
			return new UnauthorizedError(res);
		}

		let Teacher_token_info: any | RestApi.ObjectResInterface = null;

		Teacher_token_info = app_cache().get(jwt_data.token_id);

		if (!Teacher_token_info) {
			Teacher_token_info = await new TeacherTokenInfo().get_Teacher_token_by_teacher_id_and_token_id(
				jwt_data.user_id,
				jwt_data.token_id
			);

			const differenceInMilliseconds: any = new Date(jwt_data.expire_at).getTime() - new Date().getTime();

			app_cache().set(jwt_data.token_id, Teacher_token_info, differenceInMilliseconds);
		}

		if (!Teacher_token_info.is_success || !Teacher_token_info.data) {
			return new UnauthorizedError(res);
		}

		new TeacherTokenUpdate().update_last_activity_by_token_id(jwt_data.token_id).catch((e: any) => {
			AppLogger.error('error in TeacherAuthMiddleware : TeacherTokenUpdate', e);
		});

		req.user_id = jwt_data.user_id;
		req.token_id = jwt_data.token_id;
		return next();
	} catch (e: any) {
		AppLogger.error('Error in TeacherAuthMiddleware', e);
		return next(new Error(e));
	}
};
