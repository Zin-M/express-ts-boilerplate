import { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import {
    createUser,
    deleteUserById,
    getUsers,
    getUserById,
    getAllUser,
    updateUserById,
} from "../services/user.service";

const createUserHandler = asyncHandler(
    async (req: Request, res: Response) => {
        const data = req.body;
        const response = await createUser(data);
        res.status(201).json(response);
    }
);

const getUserByIdHandler = asyncHandler(
    async (req: Request, res: Response) => {
        const { userId } = req.params;
        const user = await getUserById(userId);
        res.json(user);
    }
);

const getUsersHandler = asyncHandler(async (req: Request, res: Response) => {
    const limit = parseInt(req.query.limit as string) || 10;
    const page = parseInt(req.query.page as string) || 1;

    const users = await getUsers(limit, page);
    res.json(users);
});

const getAllUserHandler = asyncHandler(
    async (req: Request, res: Response) => {
        const users = await getAllUser();
        res.json(users);
    }
);

const updateUserHandler = asyncHandler(
    async (req: Request, res: Response) => {
        const { userId } = req.params;
        const updateData = req.body;
        const userData = await updateUserById(userId, updateData);
        res.json(userData);
    }
);

const deleteUserHandler = asyncHandler(
    async (req: Request, res: Response) => {
        const { userId } = req.params;
        const deleteUser = await deleteUserById(userId);
        res.json(deleteUser);
    }
);

export default {
    createUserHandler,
    getUserByIdHandler,
    updateUserHandler,
    getAllUserHandler,
    getUsersHandler,
    deleteUserHandler,
};
