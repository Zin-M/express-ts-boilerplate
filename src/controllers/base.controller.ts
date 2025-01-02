import { BaseHttpController } from "inversify-express-utils";
import { Paginator } from "../types/general";
import httpStatus from "http-status";
import { buildPaginator } from "../helpers/pagination";
import { number } from "joi";

class BaseController extends BaseHttpController {
    respondSuccessWithPaginator(
        data: any = [],
        paginator: Paginator | null = null,
        message = "",
        { statusCode = httpStatus.OK } = {}
    ) {

        this.httpContext.response.status(statusCode);

        return ({
            success: true,
            data,
            message,
            paginator
        });
    }

    respondOkWithPagination(
        data: any[],
        message: string = "",
        { statusCode = httpStatus.OK } = {}
    ) {
        this.httpContext.response.status(statusCode);

        let newData = data;
        let paginator = null;

        if (this.httpContext.request.pagination) {
            const { offset, limit } = this.httpContext.request.pagination;
            paginator = buildPaginator(data.length, offset, limit);
            newData = data.slice(offset, offset + limit);
        }

        return ({
            success: true,
            data: newData,
            message,
            paginator
        })
    }

    respondSuccess(data: any, message = "", { statusCode = httpStatus.OK } = {}) {
        this.httpContext.response.status(statusCode);

        return ({
            success: true,
            data,
            message
        });
    }

    respondCreated(data: any = [], message: string = "") {
        this.httpContext.response.status(httpStatus.CREATED);

        return ({
            success: true,
            data,
            message
        });
    }

    responseError(
        error = "",
        message = "Error",
        { statusCode = httpStatus.BAD_REQUEST } = {}
    ) {
        this.httpContext.response.status(statusCode);

        return ({
            success: false,
            error,
            message
        });
    }

    responseNotFound(
        error = "",
        message = "Not Found",
        extra?: {
            statusCode: number
        }
    ) {
        const { statusCode = httpStatus.NOT_FOUND } = extra || {};
        this.httpContext.response.status(statusCode);

        return ({
            success: false,
            error,
            message
        });
    }

    responseNoContent(message = "No Content") {
        return ({
            success: false,
            data: null,
            message
        });
    }
}

export default BaseController;