import { Request } from 'express';
import { AppLogger } from '../lib/logger/Logger';
import { sign, verify } from 'jsonwebtoken';

export class StudentJwtUtility {
	/**
	 *
	 * @param student_id
	 * @param token_id
	 */
	static create(student_id: string, token_id: string): string | null {
		try {
			return sign(
				{
					student_id: student_id,
					student_token_id: token_id
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
	static verify(req: Request): RestApi.RestApiStudentTokenInterface | null {
		try {
			const token = req.headers?.authorization?.replace('Bearer ', '');
			if (token) {
				return verify(token, process.env.SECRET_KEY) as unknown as RestApi.RestApiStudentTokenInterface;
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
