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
import { Server as SocketIOServer } from "socket.io";
import { createServer, Server as HTTPServer } from "http";

class App {
  private app: Express;
  private server: HTTPServer;
  private io: SocketIOServer;

  constructor() {
    this.app = express();
    this.server = createServer(this.app);
    this.io = new SocketIOServer(this.server, {
      cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
      },
    });

    this.setup();
    this.setupRoutes();
    this.connectDatabase();
    this.setupSocketIO();
  }

  private setup() {
    configDotenv();
    this.app.use(morgan(":date[clf] :method :url :status :response-time ms"));
    this.app.use(cors());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(express.json());
    this.app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerOutput));
    this.setupRoutes();
    this.app.use((err: any, req: any, res: any, next: any) => {
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

    this.app.use((req: any, res: any, next: any) => {
      const err = new ApiError("API not found", httpStatus.NOT_FOUND);
      return next(err);
    });

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

  private setupSocketIO() {
    this.io.on("connection", (socket) => {
      console.log(`New client connected: ${socket.id}`);

      socket.on("disconnect", () => {
        console.log(`Client disconnected: ${socket.id}`);
      });

      socket.on("ferry-location-update", (data) => {
        console.log("Ferry location update:", data);
        this.io.emit("ferry-location-update", data);
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
    this.server.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  }

  public getApp(): Express {
    return this.app;
  }

  public close() {
    if (this.server) {
      this.io.close();
      this.server.close();
    }
  }
}

export default App;
