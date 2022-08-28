import * as cors from "cors";
import * as express from "express";
import * as http from "http";
import { errorHandler } from "./common/middlewares/error-handler";
import { loggingMiddleware } from "./common/middlewares/logging.middleware";
import { Logger } from "./common/utils/logger";
import { ControllerList } from "./controllers";
import { BaseController } from "./controllers/base.controller";
import { AppConfig } from "./infrastructure/configs";

async function bootstrap() {
	const app = express();

	app.use(express.json()); // parsing application/json
	app.use(express.urlencoded({ extended: true }));
	app.use(
		cors({
			origin: "*",
			credentials: true,
			methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
			allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "Authorization"],
		})
	);
	app.use((req, res, next) => {
		res.setHeader("X-Powered-By", AppConfig.POWER_BY);
		next();
	});
	app.use(loggingMiddleware);

	// init routes
	ControllerList.forEach((controller: BaseController) => {
		app.use(controller.basePath(), controller.router());
	});

	// handle not found route
	app.use((req, res, next) => {
		res.status(404).send();
	});

	// handle error
	app.use(errorHandler);

	// start server
	const HOST = AppConfig.HOST;
	const PORT = AppConfig.PORT;
	const PROTOCOL = AppConfig.PROTOCOL;

	http.createServer(app).listen(PORT, HOST, () => {
		Logger.info(`Server ready at ${PROTOCOL}://${HOST}:${PORT}`, "Bootstrap");
		console.log(`Server ready at ${PROTOCOL}://${HOST}:${PORT}`);
	});
}
bootstrap();
