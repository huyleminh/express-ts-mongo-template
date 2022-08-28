import { Router } from "express";

export abstract class BaseController {
    protected _router: Router;

    constructor(protected readonly _basePath: string) {
        this._router = Router();
        this.registerMiddlewares();
        this.registerRouterHandler();
    }

    protected abstract registerMiddlewares(): void;

    protected abstract registerRouterHandler(): void;

    basePath(): string {
        return this._basePath;
    }

    router(): Router {
        return this._router;
    }
}
