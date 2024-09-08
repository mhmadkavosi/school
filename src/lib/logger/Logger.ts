import { createLogger, format, transports } from 'winston';
// import DailyRotateFile from "winston-daily-rotate-file";
import { config } from 'dotenv';
import { LogTypeEnum } from './models/enums/log_type_enum';
// import { LogReportModel } from './models/log_report.model';

config();

const serviceName = process.env.APP_NAME;

const LoggerFile = createLogger({
	level: process.env.NODE_ENV === 'development' ? 'debug' : 'info',
	format: format.combine(
		format.timestamp(),
		format.errors({ stack: true }),
		format.json(),
		format.colorize(),
		format.simple(),
		format.printf((info) =>
			info.stack
				? `${info.timestamp} - ${info.level} : ${info.message} ${info.stack}`
				: `${info.timestamp} - ${info.level} : ${info.message}`
		)
	),
	transports: [
		new transports.Console()
		// new DailyRotateFile({
		//   level: "warn",
		//   json: true,
		//   filename: `%DATE%-${serviceName}.log`,
		//   datePattern: "YYYY-MM-DD",
		//   zippedArchive: true,
		//   dirname: "/logs",
		//   maxSize: "20m",
		//   maxFiles: "1d",
		//   utc: true
		// })
	]
});

class AppLoggerSingleton {
	private static _instance: AppLoggerSingleton;

	public static getInstance(): AppLoggerSingleton {
		if (!AppLoggerSingleton._instance) {
			AppLoggerSingleton._instance = new AppLoggerSingleton();
		}

		return AppLoggerSingleton._instance;
	}

	public error(errorMessage: any, errorObject: any = null, dbLog = false): void {
		const error = new Error(`${errorMessage} : ${errorObject}`);
		// dbLog && this.saveLog(LogTypeEnum.error, errorMessage, error.stack ?? '');
		LoggerFile.error(error);
	}

	public info(errorMessage: any, dbLog = false): void {
		// dbLog && this.saveLog(LogTypeEnum.info, errorMessage);
		LoggerFile.info(`${errorMessage}`);
	}

	public warning(errorMessage: any, dbLog = false): void {
		// dbLog && this.saveLog(LogTypeEnum.warning, errorMessage);
		LoggerFile.warn(`${errorMessage}`);
	}

	public debug(errorMessage: any, dbLog = false): void {
		// dbLog && this.saveLog(LogTypeEnum.debug, errorMessage);
		LoggerFile.debug(`${errorMessage}`);
	}

	private saveLog(log_type: LogTypeEnum, message: any, stack?: string) {
		try {
			// LogReportModel.create({ log_type: log_type, log_message: message, log_location: stack });
		} catch (e) {
			AppLogger.error('error in save error to db', e, false);
		}
	}
}

export const AppLogger = AppLoggerSingleton.getInstance();
