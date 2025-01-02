import { Paginator } from "../types/general";

function validateMaxNumber(number: number, max: number) {
  if (number < 0) {
    return 0;
  }
  if (number < max) {
    return number;
  }

  return max;
};

export function buildPaginator(total: number, offset: number, limit: number): Paginator {
  const currentPage = offset / limit + 1;
  const totalPages = Math.ceil(total / limit);
  const itemFrom = validateMaxNumber(
      (currentPage - 1) * limit + 1,
      total,
  );
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