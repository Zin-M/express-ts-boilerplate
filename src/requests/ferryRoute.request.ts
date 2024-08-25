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
    body("start_point")
    .isMongoId()
    .withMessage("Start Point must be a valid MongoDB ObjectId"),
    body("end_point")
    .isMongoId()
    .withMessage("End Point must be a valid MongoDB ObjectId"),
    body("name").isString().notEmpty().withMessage("Name must be a string"),
    body("location_ids")
    .isArray()
    .withMessage("Location Ids must be an array"),

    handleValidationErrors
];