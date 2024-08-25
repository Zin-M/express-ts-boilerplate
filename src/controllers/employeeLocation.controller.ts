import { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import {
  createEmployeeLocation,
  deleteEmployeeLocationById,
  getAllEmployeeLocation,
  getEmployeeLocationById,
  getEmployeeLocations,
  updateEmployeeLocationById,
} from "../services/employeeLocation.service";

const createEmployeeLocationHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const data = req.body;
    const newEmployeeLocation = await createEmployeeLocation(data);
    res.status(201).json(newEmployeeLocation);
  }
);

const getEmployeeLocationByIdHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const { employeeLocationId } = req.params;
    const employeeLocation = await getEmployeeLocationById(employeeLocationId);
    res.json(employeeLocation);
  }
);

const getEmployeeLocationsHandler = asyncHandler(async (req: Request, res: Response) => {
  const limit = parseInt(req.query.limit as string) || 10;
  const page = parseInt(req.query.page as string) || 1;

  const employeeLocations = await getEmployeeLocations(limit, page);
  res.json(employeeLocations);
});

const getAllEmployeeLocationHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const employeeLocations = await getAllEmployeeLocation();
    res.json(employeeLocations);
  }
);

const updateEmployeeLocationHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const { employeeLocationId } = req.params;
    const updateData = req.body;
    const updatedEmployeeLocation = await updateEmployeeLocationById(employeeLocationId, updateData);
    res.json(updatedEmployeeLocation);
  }
);

const deleteEmployeeLocationHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const { employeeLocationId } = req.params;
    const deletedEmployeeLocation = await deleteEmployeeLocationById(employeeLocationId);
    res.json(deletedEmployeeLocation);
  }
);

export default {
  createEmployeeLocationHandler,
  getEmployeeLocationByIdHandler,
  updateEmployeeLocationHandler,
  getAllEmployeeLocationHandler,
  getEmployeeLocationsHandler,
  deleteEmployeeLocationHandler,
};
