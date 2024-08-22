import { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import {
  createFerryRoute,
  deleteFerryRouteById,
  getAllFerryRoute,
  getFerryRouteById,
  getFerryRoutes,
  updateFerryRouteById,
} from "../services/ferryRoute.service";

const createFerryRouteHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const data = req.body;
    const newFerryRoute = await createFerryRoute(data);
    res.status(201).json(newFerryRoute);
  }
);

const getFerryRouteByIdHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const { ferryRouteId } = req.params;
    const ferryRoute = await getFerryRouteById(ferryRouteId);
    res.json(ferryRoute);
  }
);

const getFerryRoutesHandler = asyncHandler(async (req: Request, res: Response) => {
  const limit = parseInt(req.query.limit as string) || 10;
  const page = parseInt(req.query.page as string) || 1;

  const ferryRoutes = await getFerryRoutes(limit, page);
  res.json(ferryRoutes);
});

const getAllFerryRouteHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const ferryRoutes = await getAllFerryRoute();
    res.json(ferryRoutes);
  }
);

const updateFerryRouteHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const { ferryRouteId } = req.params;
    const updateData = req.body;
    const updatedFerryRoute = await updateFerryRouteById(ferryRouteId, updateData);
    res.json(updatedFerryRoute);
  }
);

const deleteFerryRouteHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const { ferryRouteId } = req.params;
    const deletedFerryRoute = await deleteFerryRouteById(ferryRouteId);
    res.json(deletedFerryRoute);
  }
);

export default {
  createFerryRouteHandler,
  getFerryRouteByIdHandler,
  updateFerryRouteHandler,
  getAllFerryRouteHandler,
  getFerryRoutesHandler,
  deleteFerryRouteHandler,
};
