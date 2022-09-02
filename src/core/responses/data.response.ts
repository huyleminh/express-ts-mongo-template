import { IBaseResponseObject } from "../interfaces/core.interface";
import { BaseResponse } from "./base.response";

export class DataResponse extends BaseResponse {
	constructor(code: number, message: string, data?: any) {
		super(code, message, data);
	}

	toJSON(): IBaseResponseObject {
		return {
			code: this._code,
			message: this._message,
			data: this._data || null,
			metadata: {
				createdDate: this._createdDate,
			},
		};
	}
}
