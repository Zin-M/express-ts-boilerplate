const httpStatus = require("http-status");

class ExtendableError extends Error {
    status;
    errorCode;
    errors: any;
    isPublic;
    isOperational;

    constructor(
        message: string,
        status: any,
        isPublic: boolean,
        { errors = [], errorCode = null, stack = null } = {}
    ) {
        super(message);
        this.name = this.constructor.name;
        this.message = message;
        this.status = status;
        this.errorCode = errorCode || status;
        this.errors = errors || [];
        this.isPublic = isPublic;
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor.name as unknown as Function);
    }
}

export class ApiError extends ExtendableError {
    constructor(
        message: string,
        status = httpStatus.INTERNAL_SERVER_ERROR,
        isPublic = false,
        { errors = [], errorCode = null, stack = null } = {}
    ) {
        super(message, status, isPublic, { errors, errorCode, stack });
    }
}

export class ValidationError extends ExtendableError {
    details: any[] = [];

    constructor(details: any[] = [], { errors = [], errorCode = null } = {}) {
        const message = "Validation error";
        super(message, httpStatus.UNPROCESSABLE_ENTITY, false, { errors, errorCode });
        this.name = this.constructor.name;
        this.message = message;
        this.status = httpStatus.UNPROCESSABLE_ENTITY;
        this.errorCode = errorCode || String(httpStatus.UNPROCESSABLE_ENTITY);
        this.errors = errors || [];
        this.details = details;
        Error.captureStackTrace(this, this.constructor.name as unknown as Function);
    }
}
