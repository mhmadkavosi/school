import { AppLogger } from './../lib/logger/Logger';
import { NextFunction, Request, Response } from 'express';
import { UnauthorizedError } from '../lib/http/error/unauthorized.error';
import { AdminTokenInfo } from '../modules/admin-auth/methods/user_token/admin_token_info';
import { AdminTokenUpdate } from '../modules/admin-auth/methods/user_token/admin_token_update';
import { app_cache } from '../config/cache.config';
import { AdminJwtUtility } from '../utils/admin_jwt.utility';
export const AdminAuthMiddleware = async (req: Request, res: Response, next: NextFunction) => {
	try {
		if (!req.headers?.authorization || !req.headers.authorization.startsWith('Bearer ')) {
			return new UnauthorizedError(res);
		}

		const token = req.headers.authorization.slice(7);

		if (!token) {
			return new UnauthorizedError(res);
		}

		const jwt_data = AdminJwtUtility.verify(req);
		if (!jwt_data) {
			return new UnauthorizedError(res);
		}

		let admin_token_info: any | RestApi.ObjectResInterface = null;

		admin_token_info = app_cache().get(jwt_data.admin_token_id);

		if (!admin_token_info) {
			admin_token_info = await new AdminTokenInfo().get_admin_token_by_admin_id_and_token_id(
				jwt_data.admin_id,
				jwt_data.admin_token_id
			);

			const differenceInMilliseconds: any = new Date(jwt_data.expire_at).getTime() - new Date().getTime();

			app_cache().set(jwt_data.admin_token_id, admin_token_info, differenceInMilliseconds);
		}

		if (!admin_token_info.is_success || !admin_token_info.data) {
			return new UnauthorizedError(res);
		}

		new AdminTokenUpdate().update_last_activity_by_token_id(jwt_data.admin_token_id).catch((e: any) => {
			AppLogger.error('error in AdminAuthMiddleware : AdminTokenUpdate', e);
		});

		req.admin_id = jwt_data.admin_id;
		req.token_id = jwt_data.admin_token_id;
		return next();
	} catch (e: any) {
		AppLogger.error('Error in AdminAuthMiddleware', e);
		return next(new Error(e));
	}
};
