import { NextFunction, Request, Response } from "express";
import { API_MESSAGES } from "../../shared/common.const";
import { BaseException } from "../exceptions/base.exception";
import { Logger } from "../utils/logger";

export function errorHandler(error: any, request: Request, response: Response, next: NextFunction) {
	if (error instanceof BaseException) {
		Logger.error(JSON.stringify(error.toErrorMessage()), "ErrorHandler");

		const responseObject = {
			code: error.code,
			message: error.message,
			data: null,
			metadata: { createdDate: new Date().toISOString() },
		};

		switch (error.context) {
			case "MiddlewareException":
				response.status(error.code).json(responseObject);
				break;
			default:
				response.status(200).json(responseObject);
				break;
		}
		return;
	}

	// runtime error
	Logger.error(error, "ErrorHandler");

	response.status(500).json({
		code: 500,
		message: API_MESSAGES.INTERNAL_ERROR,
		data: null,
		metadata: { createdDate: new Date().toISOString() },
	});
}
