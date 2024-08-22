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
    body("lattitude").isString().notEmpty().withMessage("Lattitude must be a string"),
    body("longitude").isString().notEmpty().withMessage("Longitude must be a string"),
    body("branch")  
    .isMongoId()
    .optional({ nullable: true })
    .withMessage("Branch must be a valid MongoDB ObjectId"),
    body("employee")
    .isMongoId()
    .optional({ nullable: true })
    .withMessage("Employee must be a valid MongoDB ObjectId"),
    body("driver")
    .isMongoId()
    .optional({ nullable: true })
    .withMessage("Driver must be a valid MongoDB ObjectId"),
    body("ferryRoute")
    .isMongoId()
    .optional({ nullable: true })
    .withMessage("Ferry Route must be a valid MongoDB ObjectId"),
    handleValidationErrors

];