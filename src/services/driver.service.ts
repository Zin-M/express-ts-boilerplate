import Driver from "../models/driver";
import BaseService from "./base.service";

const driverService = new BaseService(Driver);

export const getDriverById = async (id: string) => {
  return await driverService.getById(id, "branch");
};

export const getDrivers = async (limit: number, page: number) => {
  return await driverService.getAll(limit, page, "branch");
};

export const getAllDriver = async () => {
  return await driverService.getAllItems("branch");
};

export const createDriver = async (data: any) => {
  return await driverService.create(data);
};

export const updateDriverById = async (id: string, updateData: any) => {
  return await driverService.updateById(id, updateData, "branch");
};

export const deleteDriverById = async (id: string) => {
  return await driverService.deleteById(id);
};
