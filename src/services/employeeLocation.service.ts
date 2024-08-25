import EmployeeLocation from "../models/employeeLocation";
import BaseService from "./base.service";

const employeeLocationService = new BaseService(EmployeeLocation);

export const getEmployeeLocationById = async (id: string) => {
  return await employeeLocationService.getById(id);
};

export const getEmployeeLocations = async (limit: number, page: number) => {
  return await employeeLocationService.getAll(limit, page);
};

export const getAllEmployeeLocation = async () => {
  return await employeeLocationService.getAllItems();
};

export const createEmployeeLocation = async (data: any) => {
  return await employeeLocationService.create(data);
};

export const updateEmployeeLocationById = async (id: string, updateData: any) => {
  return await employeeLocationService.updateById(id, updateData);
};

export const deleteEmployeeLocationById = async (id: string) => {
  return await employeeLocationService.deleteById(id);
};
