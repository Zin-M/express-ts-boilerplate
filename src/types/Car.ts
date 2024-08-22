import { Document, Types } from "mongoose";

export interface TCar extends Document {
    carNo: string;
    chassi: string;
    color: string;
    branch: Types.ObjectId;
    status: string;
    createdAt: Date;
    updatedAt: Date;
}