import express from "express";
import { param } from "express-validator";
import EmployeeController from "../controllers/employee.controller";
import { validateEmployeeRequest } from "../requests/employee.request";

const router = express.Router();

const validateEmployeeId = param("employeeId")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("employeeId parameter must be a string");

router.get("/", EmployeeController.getEmployeesHandler);    

router.get("/all", EmployeeController.getAllEmployeeHandler);

router.get(
    "/:employeeId",
    validateEmployeeId,
    EmployeeController.getEmployeeByIdHandler
);      

router.post(
    "/",
    /*  #swagger.requestBody = {
            required: true,
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            name: { type: 'string', example: 'Some example...' },
                            emp_no: {type: 'string', example: '009'},
                            nrc: {type: 'string', example: '10/MaYaNa(N) 22929'},
                            branch: { type: 'string', example: '66c4bfa573d93a8934beddfb' },
                        },
                        required: ['name', 'emp_no', 'nrc', 'branch']
                    }
                }
            }
    } */
    validateEmployeeRequest,
    EmployeeController.createEmployeeHandler
);

router.patch(
    "/:employeeId",
    /*  #swagger.requestBody = {
            required: true,
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            name: { type: 'string', example: 'Some example...' },
                            emp_no: {type: 'string', example: '009'},
                            nrc: {type: 'string', example: '10/MaYaNa(N) 22929'},
                            branch: { type: 'string', example: '66c4bfa573d93a8934beddfb' },
                        },
                        required: ['name', 'emp_no', 'nrc', 'branch']
                    }
                }
            }
    } */
    validateEmployeeId,
    validateEmployeeRequest,
    EmployeeController.updateEmployeeHandler
);

router.delete(
    "/:employeeId",
    validateEmployeeId,
    EmployeeController.deleteEmployeeHandler
);

export default router;