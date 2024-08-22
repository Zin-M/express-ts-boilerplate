import BaseService from "./base.service";
import OfficeTime from "../models/officeTime";

const officeTimeService = new BaseService(OfficeTime);

export const getOfficeTimeById = async (id: string) => {
    return await officeTimeService.getById(id, "branch");
};

export const getOfficeTimes = async (limit: number, page: number) => {
    return await officeTimeService.getAll(limit, page, "branch");
};

export const getAllOfficeTime = async () => {
    return await officeTimeService.getAllItems("branch");
};

export const createOfficeTime = async (data: any) => {
    return await officeTimeService.create(data);
};

export const updateOfficeTimeById = async (id: string, updateData: any) => {
    return await officeTimeService.updateById(id, updateData, "branch");
};

export const deleteOfficeTimeById = async (id: string) => {
    return await officeTimeService.deleteById(id);
};
