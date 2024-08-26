import { Document, Types } from "mongoose";

export interface TEmployeeLocation extends Document {
    employee: Types.ObjectId;
    stop_location: Types.ObjectId;
    status: string;
    createdAt: Date;
    updatedAt: Date;
}