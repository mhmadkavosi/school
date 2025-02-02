import { Request } from 'express';
import { AppLogger } from '../lib/logger/Logger';
import { sign, verify } from 'jsonwebtoken';

export class AdminJwtUtility {
	/**
	 *
	 * @param admin_id
	 * @param token_id
	 */
	static create(admin_id: string, token_id: string): string | null {
		try {
			return sign(
				{
					admin_id: admin_id,
					admin_token_id: token_id
				},
				process.env.SECRET_KEY,
				{ algorithm: 'HS512', expiresIn: '1d' }
			);
		} catch (e) {
			AppLogger.error('error in UserJwtUtility create', e);
			return null;
		}
	}

	/**
	 *
	 * @param req
	 */
	static verify(req: Request): RestApi.RestApiAdminTokenInterface | null {
		try {
			const token = req.headers?.authorization?.replace('Bearer ', '');
			if (token) {
				return verify(token, process.env.SECRET_KEY) as unknown as RestApi.RestApiAdminTokenInterface;
			}
			return null;
		} catch (e: any) {
			if (e?.message !== 'jwt expired') {
				AppLogger.error('error in UserJwtUtility verify', e);
				return null;
			}
			return null;
		}
	}
}
