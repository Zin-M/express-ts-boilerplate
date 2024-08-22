import { get } from "http";
import express from "express";
import { param } from "express-validator";
import BranchController from "../controllers/branch.controller";
import { validateBranchRequest } from "../requests/branch.request";
const router = express.Router();

// Reusable validation for companyId parameter
const validateBranchId = param("branchId")
  .isString()
  .trim()
  .notEmpty()
  .withMessage("branchId parameter must be a valid string");

router.get("/", BranchController.getBranchesHandler);

router.get("/all", BranchController.getAllBranchHandler);

router.get(
  "/:branchId",
  validateBranchId,
  BranchController.getBranchByIdHandler
);

router.post(
  "/",
  /*  #swagger.requestBody = {
            required: true,
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            name: { type: 'string', example: 'Some example...' },
                            company: { type: 'string', example: '66c33e4b05f11cd52c0ac63a' },
                            start: { type: 'string', format: 'time', example: '12:00:00' },
                            end: { type: 'string', format: 'time', example: '14:00:00' }

                        },
                        required: ['name','company']
                    }
                }
            }
    } */
  validateBranchRequest,
  BranchController.createBranchHandler
);

router.patch(
  "/:branchId",
  /*  #swagger.requestBody = {
            required: true,
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            name: { type: 'string', example: 'Some example...' },
                            company: { type: 'string', example: '66c33e4b05f11cd52c0ac63a' },
                            start: { type: 'string', format: 'time', example: '12:00:00' },
                            end: { type: 'string', format: 'time', example: '14:00:00' }

                        },
                        required: ['name','company']
                    }
                }
            }
    } */
  validateBranchId,
  validateBranchRequest,
  BranchController.updateBranchHandler
);

router.delete(
  "/:branchId",
  validateBranchId,
  BranchController.deleteBranchHandler
);

export default router;
