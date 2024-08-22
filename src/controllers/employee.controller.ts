import { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";

import {
    createEmployee,
    deleteEmployeeById,
    getAllEmployee,
    getEmployeeById,
    getEmployees,
    updateEmployeeById
} from "../services/employee.service";

const createEmployeeHandler = asyncHandler(
    async(req: Request, res: Response) => {
        const data = req.body;
        const newEmployee = await createEmployee(data);
        res.status(201).json(newEmployee);
    }
)

const getEmployeeByIdHandler = asyncHandler(
    async (req: Request, res: Response) => {
        const { employeeId } = req.params;
        const employee = await getEmployeeById(employeeId);
        res.json(employee);
    }
);

const getEmployeesHandler = asyncHandler( async(req: Request, res: Response) => {
    const limit = parseInt(req.query.limit as string) || 10;
    const page = parseInt(req.query.page as string) || 1;

    const employees = await getEmployees(limit, page);
    res.json(employees);
});

const getAllEmployeeHandler = asyncHandler(
    async(req: Request, res: Response) => {
        const employees = await getAllEmployee();
        res.json(employees);
    }
);

const updateEmployeeHandler = asyncHandler(
    async(req: Request, res: Response) => {
        const { employeeId } = req.params;
        const updateData = req.body;
        const updatedEmployee = await updateEmployeeById(employeeId, updateData)
        res.json(updatedEmployee);
    }
);

const deleteEmployeeHandler = asyncHandler(
    async(req: Request, res: Response) => {
        const { employeeId } = req.params;
        const deletedEmployee = await deleteEmployeeById(employeeId);
        res.json(deletedEmployee);
    }
)

export default {
    createEmployeeHandler,
    getEmployeesHandler,
    getEmployeeByIdHandler,
    getAllEmployeeHandler,
    updateEmployeeHandler,
    deleteEmployeeHandler
}