import * as statuses from "statuses";
import { IBaseResponseObject } from "../interfaces/core.interface";

export abstract class BaseResponse {
	protected _createdDate: string;

	protected constructor(protected _code: number, protected _message: string, protected _data?: any) {
		if (!statuses.code[_code]) {
			this._code = 200;
		}
		this._message = _message || statuses.message[this._code] || "OK";
		this._createdDate = new Date().toISOString();
	}

	abstract toJSON(): IBaseResponseObject;
}
