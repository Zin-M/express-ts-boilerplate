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

export const validateEmployeeRequest = [
    body("name").isString().notEmpty().withMessage("Name must be a string"),
    body("emp_no").isString().notEmpty().withMessage("Employee No must be a string"),
    body("nrc").isString().notEmpty().withMessage("NRC must be a string"),
    body("branch")
    .isMongoId()
    .withMessage("Branch must be a valid MongoDB ObjectId"),
    handleValidationErrors

];