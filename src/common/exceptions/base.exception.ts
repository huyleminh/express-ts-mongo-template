import { API_MESSAGES } from "../../shared/common.const";

export abstract class BaseException extends Error {
	code: number;

	constructor(public context: string, message: string, code?: number, public exceptionDetail?: any) {
		super(message);

		// determine what kind of error
		this.name = this.constructor.name;

		this.code = code || 500;
		this.message = message ? message : code === 400 ? API_MESSAGES.BAD_REQUEST : API_MESSAGES.INTERNAL_ERROR;

		// enable tracing error
		Error.captureStackTrace(this, this.constructor);
	}

	toErrorMessage(): Record<string, any> {
		return { detail: this.exceptionDetail };
	}
}
