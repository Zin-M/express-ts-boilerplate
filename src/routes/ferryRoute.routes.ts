import { get } from "http";
import express from "express";
import { param } from "express-validator";
import FerryRouteController from "../controllers/ferryRoute.controller";
import { validateFerryRouteRequest } from "../requests/ferryRoute.request";
const router = express.Router();

// Reusable validation for companyId parameter
const validateFerryRouteId = param("ferryRouteId")
  .isString()
  .trim()
  .notEmpty()
  .withMessage("ferryRouteId parameter must be a valid string");

router.get("/", FerryRouteController.getFerryRoutesHandler);

router.get("/all", FerryRouteController.getAllFerryRouteHandler);

router.get(
  "/:ferryRouteId",
  validateFerryRouteId,
  FerryRouteController.getFerryRouteByIdHandler
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
                            start_point: { type: 'string', example: '66ca15d71fd5e2786eabded3' },
                            end_point: { type: 'string', example: '66ca15d71fd5e2786eabded3' },
                            name: { type: 'string', example: 'Hlaing-North Dagon' },
                        },
                        required: ['start_point','end_point', 'name']
                    }
                }
            }
    } */
  validateFerryRouteRequest,
  FerryRouteController.createFerryRouteHandler
);

router.patch(
  "/:ferryRouteId",
  /*  #swagger.requestBody = {
            required: true,
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            start_point: { type: 'string', example: '66ca15d71fd5e2786eabded3' },
                            end_point: { type: 'string', example: '66ca15d71fd5e2786eabded3' },
                            name: { type: 'string', example: 'Hlaing-North Dagon' },
                        },
                        required: ['start_point','end_point', 'name']
                    }
                }
            }
    } */
  validateFerryRouteId,
  validateFerryRouteRequest,
  FerryRouteController.updateFerryRouteHandler
);

router.delete(
  "/:ferryRouteId",
  validateFerryRouteId,
  FerryRouteController.deleteFerryRouteHandler
);

export default router;
