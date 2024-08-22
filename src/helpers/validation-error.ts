import httpStatus from "http-status";

/**
 * @extends Error
 */
class ValidationError extends Error {
  status: number;
  errorCode: string;
  errors: any[];
  details: any[];

  constructor(
    details: any[] = [],
    {
      errors = null,
      errorCode = null,
    }: { errors?: any[] | null; errorCode?: string | null } = {}
  ) {
    const message = details[0] ? details[0].message : "Validation error";
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    this.status = httpStatus.UNPROCESSABLE_ENTITY;
    this.errorCode = errorCode || String(httpStatus.UNPROCESSABLE_ENTITY);
    this.errors = errors || [];
    this.details = details;
    Error.captureStackTrace(this, this.constructor);
  }
}

export default ValidationError;
