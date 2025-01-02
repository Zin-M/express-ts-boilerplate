//import JetLogger , { JetLoggerModes } from "./JetLogger";
import WinstonLogger from "./WinstonLogger";

export type EnvLoggerMode = "console" | "singleFile" | "dailyFile";

const mode: EnvLoggerMode = process.env.LOGGER_MODE as EnvLoggerMode || "console";

const Logger = WinstonLogger.getInstance(mode);

export default Logger;