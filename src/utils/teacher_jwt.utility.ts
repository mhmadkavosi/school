import { Request } from 'express';
import { AppLogger } from '../lib/logger/Logger';
import { sign, verify } from 'jsonwebtoken';

export class TeacherJwtUtility {
	/**
	 *
	 * @param user_id
	 * @param token_id
	 */
	static create(user_id: string, token_id: string): string | null {
		try {
			return sign(
				{
					user_id: user_id,
					token_id: token_id
				},
				process.env.SECRET_KEY,
				{ algorithm: 'HS512', expiresIn: '10d' }
			);
		} catch (e) {
			AppLogger.error('error in TeacherJwtUtility create', e);
			return null;
		}
	}

	/**
	 *
	 * @param req
	 */
	static verify(req: Request): RestApi.RestApiTeacherTokenInterface | null {
		try {
			const token = req.headers?.authorization?.replace('Bearer ', '');
			if (token) {
				return verify(token, process.env.SECRET_KEY) as unknown as RestApi.RestApiTeacherTokenInterface;
			}
			return null;
		} catch (e: any) {
			if (e?.message !== 'jwt expired') {
				AppLogger.error('error in TeacherJwtUtility verify', e);
				return null;
			}
			return null;
		}
	}
}
