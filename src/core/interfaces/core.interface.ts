export interface IPagination {
	page: number;
	pageSize: number;
	totalRecord: number;
}

export interface IResponseMetadata {
	createdDate: string;
}

export interface IBaseResponseObject {
	code: number;
	message: string;
	data: any | null;
	metadata: IResponseMetadata & Record<string, any>;
}
