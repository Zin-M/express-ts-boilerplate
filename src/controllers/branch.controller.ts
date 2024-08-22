import { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import {
  createBranch,
  deleteBranchById,
  getAllBranch,
  getBranchById,
  getBranches,
  updateBranchById,
} from "../services/branch.service";

const createBranchHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const data = req.body;
    console.log(data)
    const newBranch = await createBranch(data);
    res.status(201).json(newBranch);
  }
);

const getBranchByIdHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const { branchId } = req.params;
    const branch = await getBranchById(branchId);
    res.json(branch);
  }
);

const getBranchesHandler = asyncHandler(async (req: Request, res: Response) => {
  const limit = parseInt(req.query.limit as string) || 10;
  const page = parseInt(req.query.page as string) || 1;

  const branches = await getBranches(limit, page);
  res.json(branches);
});

const getAllBranchHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const branches = await getAllBranch();
    res.json(branches);
  }
);

const updateBranchHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const { branchId } = req.params;
    const updateData = req.body;
    const updatedBranch = await updateBranchById(branchId, updateData);
    res.json(updatedBranch);
  }
);

const deleteBranchHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const { branchId } = req.params;
    const deletedBranch = await deleteBranchById(branchId);
    res.json(deletedBranch);
  }
);

export default {
  createBranchHandler,
  getBranchByIdHandler,
  updateBranchHandler,
  getAllBranchHandler,
  getBranchesHandler,
  deleteBranchHandler,
};
