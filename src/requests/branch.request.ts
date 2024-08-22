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

export const validateBranchRequest = [
  body("name").isString().notEmpty().withMessage("Name must be a string"),
  body("company")
    .isMongoId()
    .withMessage("Company must be a valid MongoDB ObjectId"),
  body("start").matches(
      /^([01]\d|2[0-3]):([0-5]\d)(:[0-5]\d)?([zZ]|([+-]([01]\d|2[0-3]):?([0-5]\d)?))?$/
  ).withMessage("Invalid time format").notEmpty().withMessage("Start time required"),
  body("end").matches(
      /^([01]\d|2[0-3]):([0-5]\d)(:[0-5]\d)?([zZ]|([+-]([01]\d|2[0-3]):?([0-5]\d)?))?$/
  ).withMessage("Invalid time format").notEmpty().withMessage("End time required"),
  handleValidationErrors,
];
