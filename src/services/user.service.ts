import User from "../models/user";
import BaseService from "./base.service";

const userService = new BaseService(User);

export const getUserById = async (id: string) => {
    return await userService.getById(id, "company");
};

export const getUsers = async (limit: number, page: number) => {
    return await userService.getAll(limit, page, "company");
};

export const getAllUser = async () => {
    return await userService.getAllItems("company");
};

export const createUser = async (data: any) => {
    return await userService.create(data);
};

export const updateUserById = async (id: string, updateData: any) => {
    return await userService.updateById(id, updateData, "company");
};

export const deleteUserById = async (id: string) => {
    return await userService.deleteById(id);
};
