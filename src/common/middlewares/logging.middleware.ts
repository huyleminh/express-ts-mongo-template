import { NextFunction, Request, Response } from "express";
import { Logger } from "../utils/logger";

// This is the most basic information to track, in future you can add or remove fields that you need/don't need
export function loggingMiddleware(request: Request, response: Response, next: NextFunction) {
	const startTime = process.hrtime();

	response.on("finish", () => {
		// caltulate total time that server spent to complete the request
		const totalTime = process.hrtime(startTime);
		const totalTimeInMs = totalTime[0] * 1000 + totalTime[1] / 1000000;

		const { ip, method, originalUrl, httpVersion } = request;
		const userAgent = request.get("user-agent") || "";

		const { statusCode } = response;
		const contentLength = response.get("Content-Length");

		const message = [ip, method, originalUrl, `HTTP ${httpVersion}`, statusCode, contentLength, userAgent, `${totalTimeInMs}ms`].join(
			" - "
		);

		if (statusCode >= 500) {
			Logger.error(message, "IncomingRequest");
			return;
		}

		if (statusCode >= 400) {
			Logger.warn(message, "IncomingRequest");
			return;
		}

		Logger.info(message, "IncomingRequest");
	});
	next();
}
