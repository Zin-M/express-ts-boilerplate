import { Request, Response, NextFunction } from "express";
import { ParsedQs } from "qs";

// Extend the Request interface to include the pagination property
interface PaginationRequest extends Request {
  pagination?: {
    page: number;
    limit: number;
    offset: number;
  };
}

// Middleware to parse pagination query parameters
export const parsePagination = (
  req: PaginationRequest,
  res: Response,
  next: NextFunction
): void => {
  let { page, limit }: any = req.query;

  page = parseInt(page as string, 10);
  limit = parseInt(limit as string, 10);

  if (isNaN(page) || page <= 0) page = 1;
  if (isNaN(limit) || limit <= 0) limit = 10;

  const offset = (page - 1) * limit;

  req.pagination = { page, limit, offset };
  next();
};

// Function to validate a number against a maximum value
function validateMaxNumber(number: number, max: number): number {
  if (number < 0) {
    return 0;
  }
  if (number < max) {
    return number;
  }

  return max;
}

// Function to build a pagination object
export const buildPaginator = (
  total: number,
  offset: number,
  limit: number
) => {
  const currentPage = Math.floor(offset / limit) + 1;
  const totalPages = Math.ceil(total / limit);
  const itemFrom = validateMaxNumber((currentPage - 1) * limit + 1, total);
  const itemTo = validateMaxNumber(currentPage * limit, total);

  return {
    totalItems: total,
    totalPages,
    itemFrom,
    itemTo,
    currentPage,
    limit,
    nextPage: currentPage < totalPages ? currentPage + 1 : null,
    previousPage: currentPage > 1 ? currentPage - 1 : null,
  };
};
