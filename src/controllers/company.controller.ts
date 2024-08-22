import { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import {
  createCompany,
  getCompanyById,
  updateCompanyById,
  getAllCompany,
  getCompanies,
  deleteCompanyById,
} from "../services/company.service";

const createCompanyHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const companyData = req.body;
    console.log(companyData);
    const newCompany = await createCompany(companyData);
    res.status(201).json(newCompany);
  }
);

const getCompanyByIdHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const { companyId } = req.params;
    const company = await getCompanyById(companyId);
    res.json(company);
  }
);

const getCompaniesHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const limit = parseInt(req.query.limit as string) || 10;
    const page = parseInt(req.query.page as string) || 1;

    const companies = await getCompanies(limit, page);
    res.json(companies);
  }
);

const getAllCompanyHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const companies = await getAllCompany();
    res.json(companies);
  }
);

const updateCompanyHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const { companyId } = req.params;
    const updateData = req.body;
    const updatedCompany = await updateCompanyById(companyId, updateData);
    res.json(updatedCompany);
  }
);

const deleteCompanyHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const { companyId } = req.params;
    const deletedCompany = await deleteCompanyById(companyId);
    res.json(deletedCompany);
  }
);

export default {
  createCompanyHandler,
  getCompanyByIdHandler,
  updateCompanyHandler,
  getAllCompanyHandler,
  getCompaniesHandler,
  deleteCompanyHandler,
};
