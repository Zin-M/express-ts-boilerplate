

export type Paginator = {
    totalItems: number,
    totalPages: number,
    itemFrom: number,
    itemTo: number,
    currentPage: number,
    limit: number,
    nextPage: number|null,
    previousPage: number|null
}

export type PaginationParams = {
    page: number,
    limit: number,
    offset: number
}

export type CommonDataWithPagination<T> = {
    data: T,
    paginator: Paginator
}

export type AuthPermission = {
    name: string,
    module_id: number,
    sub_module_id: number|null,
    module_match_id: number,
    sub_module_match_id: number|null,
    actions: Array<"view"|"create"|"edit"|"delete">
}
