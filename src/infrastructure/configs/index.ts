import * as dotenv from "dotenv";
dotenv.config();

export const AppConfig = {
	APP_ENV: process.env.APP_ENV || "",
	PROTOCOL: process.env.PROTOCOL || "http",
	HOST: process.env.HOST || "localhost",
	PORT: process.env.PORT ? +process.env.PORT : 5000,
	LOG_LEVEL: process.env.LOG_LEVEL || "info",
	POWER_BY: process.env.POWER_BY || "",
};
