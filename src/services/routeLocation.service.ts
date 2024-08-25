import RouteLocation from "../models/routeLocation";
import BaseService from "./base.service";

const routeLocationService = new BaseService(RouteLocation);

export const getRouteLocationById = async (id: string) => {
  return await routeLocationService.getById(id);
};

export const getRouteLocations = async (limit: number, page: number) => {
  return await routeLocationService.getAll(limit, page);
};

export const getAllRouteLocation = async () => {
  return await routeLocationService.getAllItems();
};

export const createRouteLocation = async (data: any) => {
  return await routeLocationService.create(data);
};

export const updateRouteLocationById = async (id: string, updateData: any) => {
  return await routeLocationService.updateById(id, updateData);
};

export const deleteRouteLocationById = async (id: string) => {
  return await routeLocationService.deleteById(id);
};
