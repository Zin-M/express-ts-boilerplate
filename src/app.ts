import express, { Express } from "express";
import cors from "cors";
import morgan from "morgan";
import httpStatus from "http-status";
import ApiError from "./helpers/api-error";
import ValidationError from "./helpers/validation-error";
import { configDotenv } from "dotenv";
import connectDB from "./db/connection";
import Routes from "./routes";
import swaggerUi from "swagger-ui-express";
import swaggerOutput from "./swagger_output.json";

class App {
  private app: Express;
  private server?: any;

  constructor() {
    this.app = express();
    this.setup();
    this.setupRoutes();
    this.connectDatabase();
  }

  private setup() {
    configDotenv();
    this.app.use(morgan(":date[clf] :method :url :status :response-time ms"));
    this.app.use(cors());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(express.json());
    this.setupRoutes();
    this.app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerOutput));

    this.app.use((err: any, req: any, res: any, next: any) => {
      // Handle validation errors
      if (err instanceof ValidationError) {
        const errors = err.details.map((detail: any) => detail.message);
        const error = new ApiError(
          errors[0],
          httpStatus.UNPROCESSABLE_ENTITY,
          true,
          { errors }
        );
        return next(error);
      }

      // Handle other errors
      if (!(err instanceof ApiError)) {
        const apiError = new ApiError(
          err.message,
          err.status || httpStatus.INTERNAL_SERVER_ERROR,
          err.isPublic,
          {
            stack: err.stack,
          }
        );
        return next(apiError);
      }

      return next(err);
    });

    // Handle 404 and forward to error handler
    this.app.use((req: any, res: any, next: any) => {
      const err = new ApiError("API not found", httpStatus.NOT_FOUND);
      return next(err);
    });

    // Error handler, send stacktrace only during development
    this.app.use((err: ApiError, req: any, res: any, next: any) => {
      console.error("Error Handler:", err);
      const errMessage = err.message || "Internal Server Error";
      res.status(err.status || httpStatus.INTERNAL_SERVER_ERROR).json({
        status: "error",
        errorCode: err.errorCode || httpStatus.INTERNAL_SERVER_ERROR,
        message: errMessage,
        errors: err.errors || [errMessage],
      });
    });
  }

  private setupRoutes() {
    new Routes(this.app);
  }

  private connectDatabase() {
    connectDB().then(() => console.log("DB connection is OK"));
  }

  public start(port: number) {
    this.app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  }

  public getApp(): Express {
    return this.app;
  }

  public close() {
    if (this.server) {
      this.server.close();
    }
  }
}

export default App;
