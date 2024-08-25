import { Document, Types } from "mongoose";

export interface TFerryRoute extends Document {
    start_point: Types.ObjectId;
    end_point: Types.ObjectId;
    name: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
}