import express, { Application, Request } from 'express';
import rateLimit from 'express-rate-limit';
import compression from 'compression';
import hpp from 'hpp';
import cors from 'cors';
import { ApiMiddleware } from '../middlewares/api.middleware';
import helmet from 'helmet';
import I18nConfig from '../config/i18n.config';
import * as i18n from 'i18n';
import Validator from 'validatorjs';
import cookieParser from 'cookie-parser';

export function RegisterMiddleware(app: Application) {
	// Middleware

	// Rate limit
	const rateLimitMiddleware = rateLimit({
		windowMs: 10 * 60 * 1000, // 5 minutes
		max: 500,
		keyGenerator: (req: Request) => {
			const ipAddress = req.ip || req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || 'unknown';
			return Array.isArray(ipAddress) ? ipAddress.join(',') : ipAddress;
		}
	});

	app.use(rateLimitMiddleware);

	app.use(compression());
	app.use(cookieParser());
	app.use(express.urlencoded({ extended: true, limit: '20mb' }));
	app.use(express.json({ limit: '20mb' }));
	app.use(helmet());
	app.use(hpp());

	// i18n.configure(I18nConfig);
	// app.use(i18n.init);

	app.use((req, res, next) => {
		Validator.useLang(req.locale);
		next();
	});

	// CORS
	app.use(
		cors({
			methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
			allowedHeaders: ['Content-Type', 'Authorization', 'platform', 'version', 'x-api-key'],
			credentials: true,
			origin: '*'
		})
	);

	app.use('*/api/v1/*', (req, res, next) => {
		return ApiMiddleware(req, res, next);
	});
}
