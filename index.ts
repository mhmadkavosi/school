import http from 'http';
import app from './src/provider/app';
import { AppLogger } from './src/lib/logger/Logger';

const createServer = () => {
	const server = http.createServer(app);

	server.listen(process.env.PORT, () =>
		AppLogger.info(`Service Api run: ${process.env.HOST}:${process.env.PORT}`)
	);

	return server;
};
const startServer = async () => {
	try {
		// createServer();
	} catch (err: any) {
		AppLogger.error(err.message, err);
		throw err;
	}
};

startServer().catch((err) => {
	AppLogger.error(err.message, err.stack);
	process.exit(1);
});

process.on('uncaughtException', (err) => {
	AppLogger.error(err.message, err.stack);
	process.exit(1);
});
