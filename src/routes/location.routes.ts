import { get } from "http";
import express from "express";
import { param } from "express-validator";
import LocationController from "../controllers/location.controller";
import { validateLocationRequest } from "../requests/location.request";
const router = express.Router();

// Reusable validation for companyId parameter
const validateLocationId = param("locationId")
  .isString()
  .trim()
  .notEmpty()
  .withMessage("locationId parameter must be a valid string");

router.get("/", LocationController.getLocationsHandler);

router.get("/all", LocationController.getAllLocationHandler);

router.get(
  "/:locationId",
  validateLocationId,
  LocationController.getLocationByIdHandler
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
                            lattitude: { type: 'string', example: '10.298989' },
                            longitude: { type: 'string', example: '9.029348' },
                            branch: { type: 'string', example: '66c4bfa573d93a8934beddfb'},
                            employee: { type: 'string', example: '66c4bfa573d93a8934beddfb'},
                            driver: { type: 'string', example: '66c4bfa573d93a8934beddfb'},
                            ferryRoute: { type: 'string', example: '66c4bfa573d93a8934beddfb'},
                        },
                        required: ['lattitude','longitude', 'branch', 'employee', 'driver', 'ferryRoute']
                    }
                }
            }
    } */
  validateLocationRequest,
  LocationController.createLocationHandler
);

router.patch(
  "/:locationId",
  /*  #swagger.requestBody = {
            required: true,
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            lattitude: { type: 'string', example: '10.298989' },
                            longitude: { type: 'string', example: '9.029348' },
                            branch: { type: 'string', example: '66c4bfa573d93a8934beddfb'},
                            employee: { type: 'string', example: '66c4bfa573d93a8934beddfb'},
                            driver: { type: 'string', example: '66c4bfa573d93a8934beddfb'},
                            ferryRoute: { type: 'string', example: '66c4bfa573d93a8934beddfb'},
                        },
                        required: ['lattitude','longitude', 'branch', 'employee', 'driver', 'ferryRoute']
                    }
                }
            }
    } */
  validateLocationId,
  validateLocationRequest,
  LocationController.updateLocationHandler
);

router.delete(
  "/:locationId",
  validateLocationId,
  LocationController.deleteLocationHandler
);

export default router;
