import { NextFunction, Request, Response } from "express";
// import { DataResponse } from "../core/responses/data.response";
import { BaseController } from "./base.controller";
import { DataResponse } from "../core/responses/data.response";

export class DemoController extends BaseController {
	constructor() {
		super("/demo");
	}

	protected registerMiddlewares(): void {
		this._router.use((req: Request, res: Response, next: NextFunction) => {
			next();
		});
	}

	protected registerRouterHandler(): void {
		this._router.get("/", this.handleDemo);
	}

	async handleDemo(req: Request, res: Response) {
		const dataRes = new DataResponse(200, "Demo");
		res.json(dataRes.toJSON());
	}
}
