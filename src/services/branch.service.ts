import Branch from "../models/branch";
import BaseService from "./base.service";

const branchService = new BaseService(Branch);

export const getBranchById = async (id: string) => {
  return await branchService.getById(id, "company");
};

export const getBranches = async (limit: number, page: number) => {
  return await branchService.getAll(limit, page, "company");
};

export const getAllBranch = async () => {
  return await branchService.getAllItems("company");
};

export const createBranch = async (data: any) => {
  return await branchService.create(data);
};

export const updateBranchById = async (id: string, updateData: any) => {
  return await branchService.updateById(id, updateData, "company");
};

export const deleteBranchById = async (id: string) => {
  return await branchService.deleteById(id);
};
