import { body, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

const handleValidationErrors = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

export const validateUserRequest = [
    body("name").isString().notEmpty().withMessage("Name must be a string"),
    body('email').isEmail(),
    body("company")
        .isMongoId()
        .withMessage("Company must be a valid MongoDB ObjectId"),
    body("password").isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
        .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter'),

    handleValidationErrors,
];
