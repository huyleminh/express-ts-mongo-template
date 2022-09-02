import { Connection, FilterQuery, Model } from "mongoose";

export abstract class BaseRepository<DocumentType, OmitKey extends string> {
	protected constructor(private _connection: Connection, protected _collectionName: string) {}

	protected get model(): Model<DocumentType> {
		return this._connection.models[this._collectionName];
	}

	async getEntityListAsync(filter: FilterQuery<DocumentType>, limit: number, page: number, select?: any): Promise<DocumentType[]> {
		const dataSet = await this.model
			.find(filter)
			.limit(limit)
			.skip(limit * (page - 1))
			.select(select)
			.exec();
		return dataSet;
	}

	async getEntityByIdAsync(id: string, select?: any): Promise<DocumentType | null> {
		const result = await this.model.findById(id).select(select).exec();
		return result;
	}

	async createAsync(entity: Omit<DocumentType, OmitKey>): Promise<DocumentType> {
		const result = await this.model.create(entity);
		return result;
	}

	async updateAsync(id: string, value: Partial<Omit<DocumentType, OmitKey>>): Promise<DocumentType | null> {
		const result = await this.model.findByIdAndUpdate(id, value, { new: true }).exec();
		return result;
	}

	async deleteAsync(id: string): Promise<boolean> {
		const result = await this.model.findByIdAndRemove(id).exec();
		return result ? true : false;
	}

	async countTotalEntitiesAsync(filter: FilterQuery<DocumentType>): Promise<number> {
		const total = await this.model.count(filter).exec();
		return total;
	}
}
