import express from "express";
import { param } from "express-validator";
import EmployeeController from "../controllers/employee.controller";

const router = express.Router();

const validateEmployeeId = param("employeeId")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("employeeId parameter must be a string");

router.get(
    "/employee/:employeeId",
    validateEmployeeId,
    EmployeeController.getEmployeeByIdHandler
);      

export default router;