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
                            latitude: { type: 'string', example: '10.298989' },
                            longitude: { type: 'string', example: '9.029348' },
                            name: { type: 'string', example: "Hlaing" },
                            address: { type: 'string', example: "Near MICT Park" },

                        },
                        required: ['latitude','longitude', 'name', 'address']
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
                              latitude: { type: 'string', example: '10.298989' },
                              longitude: { type: 'string', example: '9.029348' },
                              name: { type: 'string', example: "Hlaing" },
                              address: { type: 'string', example: "Near MICT Park" },

                          },
                          required: ['latitude','longitude', 'name', 'address']
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
