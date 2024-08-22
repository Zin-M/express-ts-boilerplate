import { Document, Types } from "mongoose";

export interface TDriver extends Document {
    name: string;
    branch: Types.ObjectId;
    car: Types.ObjectId;
    status: string;
    createdAt: Date;
    updatedAt: Date;
}