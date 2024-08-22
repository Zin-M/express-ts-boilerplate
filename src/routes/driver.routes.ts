import { get } from "http";
import express from "express";
import { param } from "express-validator";
import DriverController from "../controllers/driver.controller";
import { validateDriverRequest } from "../requests/driver.request";
const router = express.Router();

// Reusable validation for companyId parameter
const validateDriverId = param("driverId")
  .isString()
  .trim()
  .notEmpty()
  .withMessage("driverId parameter must be a valid string");

router.get("/", DriverController.getDriversHandler);

router.get("/all", DriverController.getAllDriverHandler);

router.get(
  "/:driverId",
  validateDriverId,
  DriverController.getDriverByIdHandler
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
                            branch: { type: 'string', example: '66c4bfa573d93a8934beddfb' },
                            car: { type: 'string', example: '66c631bbb2f88fec7b3d782a' }
                        },
                        required: ['name','branch', 'car']
                    }
                }
            }
    } */
  validateDriverRequest,
  DriverController.createDriverHandler
);

router.patch(
  "/:driverId",
  /*  #swagger.requestBody = {
            required: true,
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            name: { type: 'string', example: 'Some example...' },
                            branch: { type: 'string', example: '66c4bfa573d93a8934beddfb' },
                            car: { type: 'string', example: '66c631bbb2f88fec7b3d782a' }
                        },
                        required: ['name','branch', 'car']
                    }
                }
            }
    } */
  validateDriverId,
  validateDriverRequest,
  DriverController.updateDriverHandler
);

router.delete(
  "/:driverId",
  validateDriverId,
  DriverController.deleteDriverHandler
);

export default router;
