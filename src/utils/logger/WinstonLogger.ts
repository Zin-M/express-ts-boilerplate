import winston from "winston";
import path from "path";
import Logger from "./Logger";
import DailyRotateFile from "winston-daily-rotate-file";
import { EnvLoggerMode } from "./";

const DEFAULT_LOG_FILE_DIR: string = path.resolve(__dirname, "..", "..", "..", "storage/logs");
const APP_NAME: string = (process.env.APP_NAME || "app").replace(/\s/g, "");

class WinstonLogger implements Logger {
    private static _instance: WinstonLogger;

    private _logger: winston.Logger;
    private mode: EnvLoggerMode;

    private constructor(mode: EnvLoggerMode = "console") {
        this.mode = mode;
        this._logger = this.initLogger();
    }

    public static getInstance(mode: EnvLoggerMode): WinstonLogger {
        if (!WinstonLogger._instance) {
            WinstonLogger._instance = new WinstonLogger(mode);
        }

        return WinstonLogger._instance;
    }

    private initLogger(): winston.Logger {
        const getTransport = (mode: EnvLoggerMode) => {
            switch (mode) {
                case "console": return new winston.transports.Console();
                case "singleFile": {
                    return new winston.transports.File({
                        filename: path.join(DEFAULT_LOG_FILE_DIR, `${APP_NAME}.log`)
                    });
                }
                case "dailyFile": {
                    return new DailyRotateFile({
                        filename: path.join(DEFAULT_LOG_FILE_DIR, `${APP_NAME}-%DATE%.log`),
                        datePattern: "YYYY-MM-DD",
                        zippedArchive: true,
                        maxSize: "10m",
                    });
                }
            }
        };

        return winston.createLogger({
            level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
            transports: [getTransport(this.mode)],
            format: winston.format.combine(
                winston.format.align(),
                winston.format.prettyPrint(),
                winston.format.timestamp({ format: "YYYY-MM-DD hh:mm:ss A" }),
                winston.format.printf(({ timestamp, level, message }) => {
                    return winston.format.colorize().colorize(level, `[${timestamp}] ${level.toUpperCase()}: ${message}`);
                })
            ),
        })
    }

    info(content: any): void {
        this._logger.info(content);
    }

    error(content: any): void {
        this._logger.error(content);
    }

    warn(content: any): void {
        this._logger.warn(content);
    }

    debug(content: any): void {
        this._logger.debug(content);
    }

}

export default WinstonLogger;