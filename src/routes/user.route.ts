import { get } from "http";
import express from "express";
import { param } from "express-validator";
import UserController from "../controllers/user.controller";
import { validateUserRequest } from "../requests/user.request";
const router = express.Router();

// Reusable validation for companyId parameter
const validateBranchId = param("userId")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("userId parameter must be a valid string");

router.get("/", UserController.getUsersHandler);

router.get("/all", UserController.getAllUserHandler);

router.get(
    "/:userId",
    validateBranchId,
    UserController.getUserByIdHandler
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
                              email:{type:'string',example:'example@mail.com'},
                              password:{type:'string',example:'P12345'}

                          },
                          required: ['name','company','email','password']
                      }
                  }
              }
      } */
    validateUserRequest,
    UserController.createUserHandler
);

router.patch(
    "/:userId",
    /*  #swagger.requestBody = {
              required: true,
              content: {
                  'application/json': {
                      schema: {
                          type: 'object',
                          properties: {
                              name: { type: 'string', example: 'Some example...' },
                              company: { type: 'string', example: '66c33e4b05f11cd52c0ac63a' },
                              email:{type:'string',example:'example@mail.com'},
                              password:{type:'string',example:'P12345'}

                          },
                          required: ['name','company','email','password']
                      }
                  }
              }
      } */
    validateBranchId,
    validateUserRequest,
    UserController.updateUserHandler
);

router.delete(
    "/:userId",
    validateBranchId,
    UserController.deleteUserHandler
);

export default router;
