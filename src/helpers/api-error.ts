import httpStatus from "http-status";

interface ErrorOptions {
  errors?: any[] | null;
  errorCode?: string | null;
  stack?: string | null;
}

/**
 * @extends Error
 */
class ExtendableError extends Error {
  status: number;
  errorCode: string;
  errors: any[];
  isPublic: boolean;
  isOperational: boolean;
  originalStacks?: string[];

  constructor(
    message: string,
    status: number,
    isPublic: boolean,
    { errors = null, errorCode = null, stack = null }: ErrorOptions = {}
  ) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    this.status = status;
    this.errorCode = errorCode || String(status);
    this.errors = errors || [];
    this.isPublic = isPublic;
    this.isOperational = true;
    if (stack) this.originalStacks = stack.split("\n");
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Class representing an API error.
 * @extends ExtendableError
 */
class ApiError extends ExtendableError {
  /**
   * Creates an API error.
   * @param {string} message - Error message.
   * @param {number} status - HTTP status code of error.
   * @param {boolean} isPublic - Whether the message should be visible to user or not.
   * @param {ErrorOptions} options - Additional error options.
   */
  constructor(
    message: string,
    status: number = httpStatus.INTERNAL_SERVER_ERROR,
    isPublic: boolean = false,
    options: ErrorOptions = {}
  ) {
    super(message, status, isPublic, options);
  }
}

export default ApiError;
