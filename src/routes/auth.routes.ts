import express from "express";
import { param } from "express-validator";
import AuthController from "../controllers/auth.controller";
import { validateLoginRequest } from "../requests/auth.request";

const router = express.Router();

const validateEmployeeId = param("employeeId")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("employeeId parameter must be a string");

router.post(
    "/mobile/employee/login",
    /*  #swagger.requestBody = {
            required: true,
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            emp_no: {type: 'string', example: 'ap-009'},
                            password: {type: 'string', example: '*****'},
                        },
                        required: ['emp_no', 'password']
                    }
                }
            }
    } */
    validateLoginRequest,
    AuthController.loginHandler
);

export default router;