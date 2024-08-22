import Employee from "../models/employee";
import BaseService from "./base.service";

const employeeService = new BaseService(Employee);

export const getEmployeeById = async(id:string) => {
    return await employeeService.getById(id, "branch");
}

export const getEmployees = async (limit: number, page: number) => {
    return await employeeService.getAll(limit, page, "branch.company");
}

export const getAllEmployee = async () => {
    return await employeeService.getAllItems('branch');
}

export const createEmployee = async (data: any) => {
    return await employeeService.create(data);
}

export const updateEmployeeById = async (id: string, updateData: any) => {
    return await employeeService.updateById(id, updateData, "branch");
}

export const deleteEmployeeById = async(id: string) => {
    return await employeeService.deleteById(id);
}