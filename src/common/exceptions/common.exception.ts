import { BaseException } from "./base.exception";

export class MiddlewareException extends BaseException {
	constructor(message: string, code?: number, exceptionDetail?: any, responseData?: any) {
		super("MiddlewareException", message, code, exceptionDetail);
	}
}

export class ControllerException extends BaseException {
	constructor(message: string, exceptionData: any, responseCode?: number, responseData?: any) {
		super("ControllerException", message, exceptionData, responseCode);
	}
}

export class InfrastructureException extends BaseException {
	constructor(message: string, code?: number, exceptionDetail?: any, responseData?: any) {
		super("InfrastructureException", message, code, exceptionDetail);
	}
}

export class ServiceException extends BaseException {
	constructor(message: string, code?: number, exceptionDetail?: any, responseData?: any) {
		super("ServiceException", message, code, exceptionDetail);
	}
}
