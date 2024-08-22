import { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import {
    createOfficeTime,
    deleteOfficeTimeById,
    getAllOfficeTime,
    getOfficeTimeById,
    getOfficeTimes,
    updateOfficeTimeById
} from "../services/officeTime.service";

const createOfficeTimeHandler = asyncHandler(
    async (req: Request, res: Response) => {
        const data = req.body;
        const newOfficeTime = await createOfficeTime(data);
        res.status(201).json(newOfficeTime);
    }
);

const getOfficeTimeByIdHandler = asyncHandler(
    async (req: Request, res: Response) => {
        const { officeTimeId } = req.params;
        const officeTime = await getOfficeTimeById(officeTimeId);
        res.json(officeTime);
    }
);

const getOfficeTimesHandler = asyncHandler(async (req: Request, res: Response) => {
    const limit = parseInt(req.query.limit as string) || 10;
    const page = parseInt(req.query.page as string) || 1;

    const officeTimes = await getOfficeTimes(limit, page);
    res.json(officeTimes);
});

const getAllOfficeTimeHandler = asyncHandler(
    async (req: Request, res: Response) => {
        const officeTimes = await getAllOfficeTime();
        res.json(officeTimes);
    }
);

const updateOfficeTimeHandler = asyncHandler(
    async (req: Request, res: Response) => {
        const { officeTimeId } = req.params;
        const updateData = req.body;
        const updatedOfficeTime = await updateOfficeTimeById(officeTimeId, updateData);
        res.json(updatedOfficeTime);
    }
);

const deleteOfficeTimeHandler = asyncHandler(
    async (req: Request, res: Response) => {
        const { officeTimeId } = req.params;
        const deletedOfficeTime = await deleteOfficeTimeById(officeTimeId);
        res.json(deletedOfficeTime);
    }
);

export default {
    createOfficeTimeHandler,
    getOfficeTimeByIdHandler,
    updateOfficeTimeHandler,
    getAllOfficeTimeHandler,
    getOfficeTimesHandler,
    deleteOfficeTimeHandler,
};
