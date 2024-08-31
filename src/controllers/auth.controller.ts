import { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import Employee from "../models/employee";
import jwt from 'jsonwebtoken';
import { configDotenv } from "dotenv";

import { comparePassword } from "../services/employee.service";
import routeLocation from "../models/routeLocation";
import Location from "../models/location";

configDotenv();

const loginHandler = asyncHandler(
    async(req: Request, res: Response) => {
        const {emp_no, password} = req.body;
        const employee = await Employee.findOne({emp_no});

        if(!employee) {
            res.status(404).json({ message: 'Employee not found' });
        }else {
            const passwordMatch = await comparePassword(password, employee.password);
            if (!passwordMatch) {
                res.status(401).json({ message: 'Incorrect password' });
            }
            let secret_key = process.env.JWT_SECRET as string;
            const token = jwt.sign({ userId: employee._id }, secret_key, {
                expiresIn: '1 hour'
              });

              let empData = await Employee.findById(employee.id).select('name emp_no route')
                        .populate({
                            path: 'branch',
                            select: 'name',
                            populate: {
                                path: 'company',
                                select: 'name'
                            }
                        })
                        .populate({
                            path: 'ferry_destination',
                            select: 'name address latitude longitude'
                        })
                        .populate({
                            path: 'route',
                            select: 'name'
                        })
                        .lean();
                        
                        if (!employee) {
                            throw new Error(`${Employee.modelName} not found`);
                        }

                let location_ids = (await routeLocation.find({ route: employee.route }).sort({ sr_no: 1 })).map(doc => doc.stop_location);

                let locations: Array<any> = [];

                for (let index = 0; index < location_ids.length; index++) {
                    let location = await Location.findById(location_ids[index]).select('name address latitude longitude').lean();
                    locations.push(location);
                }
                        
            res.status(200).json({status: 200, data: {...empData, locations: locations}, token: token});
        }
    }
)


export default {
    loginHandler
}