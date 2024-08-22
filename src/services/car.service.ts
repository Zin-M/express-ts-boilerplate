import Car from "../models/car";
import BaseService from "./base.service";

const carService = new BaseService(Car);

export const getCarById = async (id: string) => {
  return await carService.getById(id, "branch");
};

export const getCars = async (limit: number, page: number) => {
  return await carService.getAll(limit, page, "branch");
};

export const getAllCar = async () => {
  return await carService.getAllItems("branch");
};

export const createCar = async (data: any) => {
  return await carService.create(data);
};

export const updateCarById = async (id: string, updateData: any) => {
  return await carService.updateById(id, updateData, "branch");
};

export const deleteCarById = async (id: string) => {
  return await carService.deleteById(id);
};
