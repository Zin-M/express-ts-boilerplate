import Company from "../models/company";
import BaseService from "./base.service";

const companyService = new BaseService(Company);

export const getCompanyById = async (id: string) => {
  return await companyService.getById(id);
};

export const getCompanies = async (limit: number, page: number) => {
  return await companyService.getAll(limit, page);
};

export const getAllCompany = async () => {
  return await companyService.getAllItems();
};

export const createCompany = async (companyData: any) => {
  return await companyService.create(companyData);
};

export const updateCompanyById = async (id: string, updateData: any) => {
  return await companyService.updateById(id, updateData); // Updates a company by ID
};

export const deleteCompanyById = async (id: string) => {
  return await companyService.deleteById(id); // Deletes (soft delete) a company by ID
};
