import { body, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

const handleValidationErrors = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}

export const validateFerryRouteRequest = [
    body("startPoint").isString().notEmpty().withMessage("Start Point must be a string"),
    body("endPoint").isString().notEmpty().withMessage("End Point must be a string"),
    body("name").isString().notEmpty().withMessage("Name must be a string"),
    handleValidationErrors
];