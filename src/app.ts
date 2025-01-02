import "reflect-metadata";
import morgan from "morgan";
import cors from "cors";
import { InversifyExpressServer } from "inversify-express-utils";
import {
  default as express,
  Application,
  Request,
  Response,
  NextFunction,
} from "express";
import container from "./container";
import { getRouteInfo } from "inversify-express-utils";
import * as prettyJson from "prettyjson"
import { ApiError, ValidationError } from "./helpers/error";
import { Logger } from "./utils";
import httpStatus from "http-status";
import path from "path";
// import paginationMiddleware from "./middlewares/ParsePagination";
import fileUpload from "express-fileupload";
import "reflect-metadata";
import parsePagination from "./middlewares/pagination.middleware";

class App {
  private app: Application;

  constructor() {
    const server = new InversifyExpressServer(container, null, { rootPath: "/api/v1" });

    this.setConfig(server);
    this.setErrorConfig(server);

    this.app = server.build();
  }

  public getApp(): Application {
    return this.app;
  }

  private setConfig(server: InversifyExpressServer) {
    server.setConfig(app => {
      app.use(morgan(`:date[clf] :method :url :status :response-time ms`));
      app.use(cors({
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        optionsSuccessStatus: 204,
        maxAge: 600
      }));
      app.options("*", (req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        res.sendStatus(204);
      });
      app.use('/public', express.static(path.join(__dirname, '..', 'storage/uploads')));
      app.use(express.urlencoded({ extended: false }));
      app.use(express.json());
      app.use(fileUpload());
      app.use(parsePagination);
    })
  }

  private setErrorConfig(server: InversifyExpressServer) {
    server.setErrorConfig(app => {
      /** 404 */
      app.use((req: Request, res: Response, next: NextFunction) => {
        next(new ApiError("Route Not Found", 404, true));
      });

      /** First Error */
      app.use((err: Error | ApiError, req: Request, res: Response, next: NextFunction) => {
        if (err instanceof ValidationError) {
          const errors: any = [];

          for (const params of err.details || []) {
            errors.push(params.message);
          }

          const error = new ApiError(
              errors[0],
              httpStatus.UNPROCESSABLE_ENTITY,
              true,
              { errors }
          );
          return next(error);
        }

        next(err);
      })

      /** Final error */
      app.use((err: ApiError, req: Request, res: Response, next: NextFunction) => {
        const statusCode = err instanceof ApiError ? err.status : 500;
        const isPublic = err instanceof ApiError && err.isPublic;

        const message = (statusCode == 500 || !isPublic) ? 'Internal server error' : err.message;

        if (statusCode === 500) {
          Logger.error(err.stack?.toString());
        }

        res.status(statusCode).json({
          status: "error",
          errorCode: err.errorCode || err.status,
          message: message,
          errors: err.errors || [message],
        });
      })
    })
  }

  public printRouteInfo() {
    const routes = getRouteInfo(container);

    console.log(prettyJson.render({ routes }));
  }
}

export default App;