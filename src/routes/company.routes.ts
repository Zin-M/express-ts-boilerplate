import express from "express";
import { param } from "express-validator";
import CompanyController from "../controllers/company.controller";
import { validateCompanyRequest } from "../requests/company.request";

const router = express.Router();

const validateCompanyId = param("companyId")
  .isString()
  .trim()
  .notEmpty()
  .withMessage("companyId parameter must be a valid string");

router.get("/", CompanyController.getCompaniesHandler);

router.get("/all", CompanyController.getAllCompanyHandler);

router.get(
  "/:companyId",
  validateCompanyId,
  CompanyController.getCompanyByIdHandler
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
                        },
                        required: ['name']
                    }
                }
            }
    } */
  validateCompanyRequest,

  CompanyController.createCompanyHandler
);

router.patch(
  "/:companyId",
  /*  #swagger.requestBody = {
            required: true,
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            name: { type: 'string', example: 'Some example...' },
                        },
                        required: ['name']
                    }
                }
            }
    } */
  validateCompanyId,
  validateCompanyRequest,
  CompanyController.updateCompanyHandler
);

router.delete(
  "/:companyId",
  validateCompanyId,
  CompanyController.deleteCompanyHandler
);

export default router;
