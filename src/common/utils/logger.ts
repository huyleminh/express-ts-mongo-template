import * as moment from "moment";
import * as winston from "winston";
import "winston-daily-rotate-file";
import { AppConfig } from "../../infrastructure/configs";
import stringify from "fast-safe-stringify";

const format = winston.format.combine(
	winston.format.timestamp(),
	winston.format.ms(),
	winston.format.printf(({ context, level, timestamp, ms, message }) => {
		const timestampString = moment(timestamp).toLocaleString();
		return `[${timestampString}] : [${level}] : [${context}] : ${message} ${ms}`;
	})
);

const fileTransport = new winston.transports.DailyRotateFile({
	filename: "app-%DATE%",
	extension: ".log",
	dirname: "logs",
	datePattern: "YYYY-MM-DD",
	maxSize: "20m",
	maxFiles: "30d",
});

const WinstonLogger = winston.createLogger({ transports: [fileTransport], format, level: AppConfig.LOG_LEVEL });

export class Logger {
	constructor(private context: string = "Application") {}

	debug(message: any, context?: string) {
		if (context) {
			this.context = context;
		}
		const msg = typeof message === "object" ? stringify(message) : message;
		WinstonLogger.log({ level: "debug", message: msg, context: this.context });
	}

	info(message: any, context?: string) {
		if (context) {
			this.context = context;
		}
		const msg = typeof message === "object" ? stringify(message) : message;
		WinstonLogger.log({ level: "info", message: msg, context: this.context });
	}

	warn(message: any, context?: string) {
		if (context) {
			this.context = context;
		}
		const msg = typeof message === "object" ? stringify(message) : message;
		WinstonLogger.log({ level: "warn", message: msg, context: this.context });
	}

	error(message: any, context?: string) {
		if (context) {
			this.context = context;
		}
		const msg = typeof message === "object" ? stringify(message) : message;
		WinstonLogger.log({ level: "error", message: msg, context: this.context });
	}

	static debug(message: any, context?: string) {
		const msg = typeof message === "object" ? stringify(message) : message;
		WinstonLogger.log({ level: "debug", message: msg, context: context || "Application" });
	}

	static info(message: any, context?: string) {
		const msg = typeof message === "object" ? stringify(message) : message;
		WinstonLogger.log({ level: "info", message: msg, context: context || "Application" });
	}

	static warn(message: any, context?: string) {
		const msg = typeof message === "object" ? stringify(message) : message;
		WinstonLogger.log({ level: "warn", message: msg, context: context || "Application" });
	}

	static error(message: any, context?: string) {
		const msg = typeof message === "object" ? stringify(message) : message;
		WinstonLogger.log({ level: "error", message: msg, context: context || "Application" });
	}
}
