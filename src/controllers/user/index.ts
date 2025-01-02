import * as express from "express";
import {
    controller,
    httpDelete,
    httpGet,
    httpPost,
    httpPut, queryParam,
    request,
    response,
    requestParam
} from "inversify-express-utils";

import {
    createUser,
    deleteUserById,
    getUsers,
    getUserById,
    getAllUser,
    updateUserById
} from "../../services/user.service";
import BaseController from "../base.controller";
import validate from "../../middlewares/validator.middleware";
import { validator } from "./request";
import paginationMiddleware from "../../middlewares/pagination.middleware";
import * as console from "node:console";



@controller("/users")
export class UserController extends BaseController  {

    @httpPost("/",validate(validator.createOne))
    private async createOne(@request() req: express.Request, @response() res: express.Response) {
        try {
            const data = req.body;
            const response = await createUser(data);
            return  this.respondCreated(response,'successfully created')
        } catch (err: any) {
            return  this.responseError(err)
        }
    }

    @httpGet("/:userId",validate(validator.findOne))
    private async findById(@requestParam("userId") userId: string, @response() res: express.Response) {
        try {
            const user = await getUserById(userId);
            return this.respondSuccess(user,'get one')
        } catch (err: any) {
            return  this.responseError(err)
        }
    }

    @httpGet("/",validate(validator.findAll),paginationMiddleware)
    private async findAll(
        @queryParam("limit") limit: number = 10,
        @queryParam("page") page: number = 1,
        @response() res: express.Response
    ) {
        try {
            const users = await getUsers(limit, page);
            return this.respondOkWithPagination(users,'get users');
        } catch (err: any) {
            return  this.responseError(err)
        }
    }

    @httpGet("/all")
    private async getAll(@response() res: express.Response) {
        try {
            const users = await getAllUser();
            return this.respondSuccess(users,'get all')
        } catch (err: any) {
            return  this.responseError(err)
        }
    }

    @httpPut("/:userId",validate(validator.updateOne))
    private async updateOne(
        @requestParam("userId") userId: string,
        @request() req: express.Request,
        @response() res: express.Response
    ) {
        try {
            const updateData = req.body;
            const userData = await updateUserById(userId, updateData);
            return this.respondSuccess(userData,'successfully updated')
        } catch (err: any) {
            return  this.responseError(err)
        }
    }

    @httpDelete("/:userId",validate(validator.deleteOne))
    private async deleteOne(@requestParam("userId") userId: string, @response() res: express.Response) {
        try {
            const deleteUser = await deleteUserById(userId);
            return this.respondSuccess(deleteUser,'successfully deleted')
        } catch (err: any) {
            return  this.responseError(err)
        }
    }
}
