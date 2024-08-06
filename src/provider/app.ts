import express, { Application, Request, Response } from 'express';
import { RegisterMiddleware } from './middleware.provider';
import { RegisterRoutes } from './route.provider';
import { ApiRes } from '../lib/http/api_response';
import { HttpStatus } from '../lib/http/http_status';
import { NotfoundError } from '../lib/http/error/notfound.error';

const app: Application = express();

app.set('trust proxy', true);

// Register middleware
RegisterMiddleware(app);

// Register routes
RegisterRoutes(app);

// Default route
app.get('/', (req: Request, res: Response) => {
	return ApiRes(res, {
		status: HttpStatus.OK,
		msg: 'OK'
	});
});

// Error page route
app.use((req: Request, res: Response) => {
	return new NotfoundError(res);
});

export default app;
