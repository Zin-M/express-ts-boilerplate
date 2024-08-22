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

export const validateCarRequest = [
    body("carNo").isString().notEmpty().withMessage("Car No must be a string"),
    body("chassi").isString().notEmpty().withMessage("Chassi must be a string"),
    body("color").isString().notEmpty().withMessage("Color must be a string"),
    body("branch")
    .isMongoId()
    .withMessage("Branch must be a valid MongoDB ObjectId"),
    handleValidationErrors

];