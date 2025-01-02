import BaseService from "./base.service";
import {PrismaClient,} from "@prisma/client";
import {TUser} from "../types/User";
import * as console from "node:console";

const prisma = new PrismaClient();


const userService = new BaseService(prisma,'users');

export const getUserById = async (id: string) => {
    return await userService.getById("user_id",id);
};

export const getUsers = async (limit: number, page: number) => {
    return await userService.getAll(limit, page);
};

export const getAllUser = async () => {
    console.log('he')
    return await userService.getAllItems();
};

export const createUser = async (data:TUser) => {
    return await userService.create(data);
};

export const updateUserById = async (id: string, updateData: TUser) => {
    return await userService.updateById('user_id',id, updateData);
};

export const deleteUserById = async (id: string) => {
    return await userService.deleteById('user_id',id);
};

