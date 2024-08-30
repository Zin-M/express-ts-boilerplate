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
    let routeLocationIds = await RouteLocation.find({ route: id })
      .select('stop_location') 
      .lean();

      let routeLocations = await RouteLocation.find({ route: id }).populate('stop_location').sort({ sr_no: 1})
      .lean();
    return { 
        status: 200,
        data: {...ferryRoute, location_ids: routeLocationIds.map(location => location.stop_location), locations: routeLocations}
     };
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
    const ferryRoutes = await FerryRoute.find().populate('start_point').populate('end_point').lean();
    const ferryRoutesWithLocations = await Promise.all(
      ferryRoutes.map(async (ferryRoute) => {
        const routeLocations = await RouteLocation.find({ route: ferryRoute._id }).populate('stop_location').sort({ sr_no: 1 }).lean();
        return { ...ferryRoute, locations: routeLocations  };
      })
    );
    return {
      status: 200,
      data: ferryRoutesWithLocations
    };
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
