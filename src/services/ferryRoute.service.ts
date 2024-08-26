import FerryRoute from "../models/ferryRoute";
import RouteLocation from "../models/routeLocation";
import BaseService from "./base.service";

const ferryRouteService = new BaseService(FerryRoute);

export const getFerryRouteById = async (id: string) => {
  try {
    const ferryRoute = await FerryRoute.findById(id).lean();
    if (!ferryRoute) {
      throw new Error('Ferry Route not found');
    }
    const routeLocations = await RouteLocation.find({ route_id: id })
      .select('location_id') 
      .lean();
    return { ...ferryRoute, route_locations: routeLocations.map(location => location.location_id) };
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch ferry route');
  }
};

export const getFerryRoutes = async (limit: number, page: number) => {
  return await ferryRouteService.getAll(limit, page);
};

export const getAllFerryRoute = async () => {
  try {
    const ferryRoutes = await FerryRoute.find().lean();
    const ferryRoutesWithLocations = await Promise.all(
      ferryRoutes.map(async (route) => {
        const routeLocations = await RouteLocation.find({ route_id: route._id })
          .lean();
        return { ...route, route_locations: routeLocations };
      })
    );

    return ferryRoutesWithLocations;
  } catch (error) {
    throw new Error('Failed to fetch ferry routes');
  }
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
