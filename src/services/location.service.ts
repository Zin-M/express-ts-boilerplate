import Location from "../models/location";
import BaseService from "./base.service";

const locationService = new BaseService(Location);

export const getLocationById = async (id: string) => {
  return await locationService.getById(id, "branch");
};

export const getLocations = async (limit: number, page: number) => {
  return await locationService.getAll(limit, page, "branch");
};

export const getAllLocation = async () => {
  return await locationService.getAllItems("branch");
};

export const createLocation = async (data: any) => {
  return await locationService.create(data);
};

export const updateLocationById = async (id: string, updateData: any) => {
  return await locationService.updateById(id, updateData, "branch");
};

export const deleteLocationById = async (id: string) => {
  return await locationService.deleteById(id);
};
