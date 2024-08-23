import { Document, Types } from "mongoose";

export interface TCar extends Document {
    car_no: string;
    color: string;
    branch: Types.ObjectId;
    status: string;
    createdAt: Date;
    updatedAt: Date;
}