import { Document, Types } from "mongoose";

export interface TFerryRoute extends Document {
    startPoint: string;
    endPoint: string;
    name: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
}