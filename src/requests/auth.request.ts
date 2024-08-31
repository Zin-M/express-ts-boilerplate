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

export const validateLoginRequest = [
    body("emp_no").isString().notEmpty().withMessage("Employee No must be a string"),
    body("password").notEmpty(),
    handleValidationErrors

];