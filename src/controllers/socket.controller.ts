import { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import {
    createCar,
    deleteCarById,
    getAllCar,
    getCarById,
    getCars,
    updateCarById,
} from "../services/car.service";

const createCarHandler = asyncHandler(
    async (req: Request, res: Response) => {
        const data = req.body;
        const newCar = await createCar(data);
        res.status(201).json(newCar);
    }
);

const getCarByIdHandler = asyncHandler(
    async (req: Request, res: Response) => {
        const { carId } = req.params;
        const car = await getCarById(carId);
        res.json(car);
    }
);

const getCarsHandler = asyncHandler(async (req: Request, res: Response) => {
    const limit = parseInt(req.query.limit as string) || 10;
    const page = parseInt(req.query.page as string) || 1;

    const cars = await getCars(limit, page);
    res.json(cars);
});

const getAllCarHandler = asyncHandler(
    async (req: Request, res: Response) => {
        const cars = await getAllCar();
        res.json(cars);
    }
);

const updateCarHandler = asyncHandler(
    async (req: Request, res: Response) => {
        const { carId } = req.params;
        const updateData = req.body;
        const updatedCar = await updateCarById(carId, updateData);
        res.json(updatedCar);
    }
);

const deleteCarHandler = asyncHandler(
    async (req: Request, res: Response) => {
        const { carId } = req.params;
        const deletedCar = await deleteCarById(carId);
        res.json(deletedCar);
    }
);

export default {
    createCarHandler,
    getCarByIdHandler,
    updateCarHandler,
    getAllCarHandler,
    getCarsHandler,
    deleteCarHandler,
};
