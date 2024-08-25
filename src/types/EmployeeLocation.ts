import { Document, Types } from "mongoose";

export interface TEmployeeLocation extends Document {
    employee_id: Types.ObjectId;
    location_id: Types.ObjectId;
    status: string;
    createdAt: Date;
    updatedAt: Date;
}