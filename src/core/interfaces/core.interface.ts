export interface IPagination {
	page: number;
	pageSize: number;
	totalRecord: number;
}

export interface IResponseMetadata {
	createdDate: string;
	pagination?: IPagination;
}

export interface IBaseResponseObject {
	code: number;
	message: string;
	data?: any;
	metadata: IResponseMetadata & Record<string, any>;
}
