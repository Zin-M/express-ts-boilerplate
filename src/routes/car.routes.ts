import { get } from "http";
import express from "express";
import { param } from "express-validator";
import CarController from "../controllers/car.controller";
import { validateCarRequest } from "../requests/car.request";
const router = express.Router();

// Reusable validation for companyId parameter
const validateCarId = param("carId")
  .isString()
  .trim()
  .notEmpty()
  .withMessage("carId parameter must be a valid string");

router.get("/", CarController.getCarsHandler);

router.get("/all", CarController.getAllCarHandler);

router.get(
  "/:carId",
  validateCarId,
  CarController.getCarByIdHandler
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
                            carNo: { type: 'string', example: 'Some example...' },
                            chassi: { type: 'string', example: 'ljasdlfk' },
                            color: { type: 'string', example: 'white' },
                            branch: { type: 'string', example: '66c4bfa573d93a8934beddfb' }
                        },
                        required: ['carNo','chassi', 'color', 'branch']
                    }
                }
            }
    } */
  validateCarRequest,
  CarController.createCarHandler
);

router.patch(
  "/:carId",
  /*  #swagger.requestBody = {
            required: true,
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            carNo: { type: 'string', example: 'Some example...' },
                            chassi: { type: 'string', example: 'ljasdlfk' },
                            color: { type: 'string', example: 'white' },
                            branch: { type: 'string', example: '66c4bfa573d93a8934beddfb' }
                        },
                        required: ['carNo','chassi', 'color', 'branch']
                    }
                }
            }
    } */
  validateCarId,
  validateCarRequest,
  CarController.updateCarHandler
);

router.delete(
  "/:carId",
  validateCarId,
  CarController.deleteCarHandler
);

export default router;
