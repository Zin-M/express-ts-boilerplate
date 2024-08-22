import FerryRoute from "../models/ferryRoute";
import BaseService from "./base.service";

const ferryRouteService = new BaseService(FerryRoute);

export const getFerryRouteById = async (id: string) => {
  return await ferryRouteService.getById(id);
};

export const getFerryRoutes = async (limit: number, page: number) => {
  return await ferryRouteService.getAll(limit, page);
};

export const getAllFerryRoute = async () => {
  return await ferryRouteService.getAllItems();
};

export const createFerryRoute = async (data: any) => {
  return await ferryRouteService.create(data);
};

export const updateFerryRouteById = async (id: string, updateData: any) => {
  return await ferryRouteService.updateById(id, updateData);
};

export const deleteFerryRouteById = async (id: string) => {
  return await ferryRouteService.deleteById(id);
};
