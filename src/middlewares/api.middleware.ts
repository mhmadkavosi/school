import { NextFunction, Request, Response } from 'express';
import { get_user_agent } from '../utils/user_agent.utility';
import { BaseConfig } from '../config/base.config';
import { AppLogger } from '../lib/logger/Logger';
import { ForbiddenError } from '../lib/http/error/forbidden.error';

export const ApiMiddleware = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const user_agent = get_user_agent(req);
		if (
			user_agent.api_key !== process.env.API_KEY ||
			user_agent.api_version != BaseConfig.VERSION ||
			!user_agent.api_platform ||
			!['Web', 'Mobile', 'Desktop'].includes(user_agent.api_platform.toString())
		) {
			return new ForbiddenError(res);
		} else {
			return next();
		}
	} catch (e: any) {
		AppLogger.error('Error in ApiMiddleware', e);
		return next(new Error(e));
	}
};
