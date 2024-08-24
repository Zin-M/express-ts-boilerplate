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

export const validateLocationRequest = [
    body("latitude").isString().notEmpty().withMessage("Latitude must be a string"),
    body("longitude").isString().notEmpty().withMessage("Longitude must be a string"),
    body("name").isString().notEmpty().withMessage("Name must be a string"),

    handleValidationErrors

];