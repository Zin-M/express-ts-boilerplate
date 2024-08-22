import { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import {
  createLocation,
  deleteLocationById,
  getAllLocation,
  getLocationById,
  getLocations,
  updateLocationById,
} from "../services/location.service";

const createLocationHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const data = req.body;
    const newLocation = await createLocation(data);
    res.status(201).json(newLocation);
  }
);

const getLocationByIdHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const { locationId } = req.params;
    const location = await getLocationById(locationId);
    res.json(location);
  }
);

const getLocationsHandler = asyncHandler(async (req: Request, res: Response) => {
  const limit = parseInt(req.query.limit as string) || 10;
  const page = parseInt(req.query.page as string) || 1;

  const locations = await getLocations(limit, page);
  res.json(locations);
});

const getAllLocationHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const locations = await getAllLocation();
    res.json(locations);
  }
);

const updateLocationHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const { locationId } = req.params;
    const updateData = req.body;
    const updatedLocation = await updateLocationById(locationId, updateData);
    res.json(updatedLocation);
  }
);

const deleteLocationHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const { locationId } = req.params;
    const deletedLocation = await deleteLocationById(locationId);
    res.json(deletedLocation);
  }
);

export default {
  createLocationHandler,
  getLocationByIdHandler,
  updateLocationHandler,
  getAllLocationHandler,
  getLocationsHandler,
  deleteLocationHandler,
};
