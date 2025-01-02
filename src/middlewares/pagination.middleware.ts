import { Request, Response, NextFunction } from "express";

export default function parsePagination(req: Request, res: Response, next: NextFunction) {
    let { page: qPage, limit: qLimit } = req.query;

    if (!qPage || !qLimit) {
        return next();
    }

    let page = parseInt(qPage as string, 10);
    let limit = parseInt(qLimit as string, 10);

    if (!page || page <= 0) {
        page = 1;
    }

    if (!limit || limit <= 0) {
        limit = 10;
    }
    
    const offset = (page - 1) * limit;
    req.pagination = { page, limit, offset };
    next();
};