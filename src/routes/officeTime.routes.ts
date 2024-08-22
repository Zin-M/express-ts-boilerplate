import express from "express";
import { param } from "express-validator";
import OfficeTimeController from "../controllers/officeTime.controller";
import {validateOfficeTimeRequest} from "../requests/officeTime.request";
const router = express.Router();

// Reusable validation for companyId parameter
const validateBranchId = param("officeTimeId")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("officeTimeId parameter must be a valid string");

router.get("/", OfficeTimeController.getOfficeTimesHandler);

router.get("/all", OfficeTimeController.getAllOfficeTimeHandler);

router.get(
    "/:officeTimeId",
    validateBranchId,
    OfficeTimeController.getOfficeTimeByIdHandler
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
                        branch: { type: 'string', example: '66c33e4b05f11cd52c0ac63a' },
                        start: { type: 'string', format: 'time', example: '12:00:00' },
                        end: { type: 'string', format: 'time', example: '14:00:00' }
                    },
                    required: ['branch', 'start', 'end']
                }
            }
        }
    } */
    validateOfficeTimeRequest,
    OfficeTimeController.createOfficeTimeHandler
);

router.patch(
    "/:officeTimeId",
    /*  #swagger.requestBody = {
        required: true,
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        branch: { type: 'string', example: '66c33e4b05f11cd52c0ac63a' },
                        start: { type: 'string', format: 'time', example: '12:00:00' },
                        end: { type: 'string', format: 'time', example: '14:00:00' }
                    },
                    required: ['branch', 'start', 'end']
                }
            }
        }
    } */
    validateBranchId,
    validateOfficeTimeRequest,
    OfficeTimeController.updateOfficeTimeHandler
);

router.delete(
    "/:officeTimeId",
    validateBranchId,
    OfficeTimeController.deleteOfficeTimeHandler
);

export default router;
