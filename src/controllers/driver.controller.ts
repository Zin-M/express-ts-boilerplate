import { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import {
  createDriver,
  deleteDriverById,
  getAllDriver,
  getDriverById,
  getDrivers,
  updateDriverById,
} from "../services/driver.service";

const createDriverHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const data = req.body;
    const newDriver = await createDriver(data);
    res.status(201).json(newDriver);
  }
);

const getDriverByIdHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const { driverId } = req.params;
    const driver = await getDriverById(driverId);
    res.json(driver);
  }
);

const getDriversHandler = asyncHandler(async (req: Request, res: Response) => {
  const limit = parseInt(req.query.limit as string) || 10;
  const page = parseInt(req.query.page as string) || 1;

  const drivers = await getDrivers(limit, page);
  res.json(drivers);
});

const getAllDriverHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const drivers = await getAllDriver();
    res.json(drivers);
  }
);

const updateDriverHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const { driverId } = req.params;
    const updateData = req.body;
    const updatedDriver = await updateDriverById(driverId, updateData);
    res.json(updatedDriver);
  }
);

const deleteDriverHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const { driverId } = req.params;
    const deletedDriver = await deleteDriverById(driverId);
    res.json(deletedDriver);
  }
);

export default {
  createDriverHandler,
  getDriverByIdHandler,
  updateDriverHandler,
  getAllDriverHandler,
  getDriversHandler,
  deleteDriverHandler,
};
