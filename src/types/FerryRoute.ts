import { Document, Types } from "mongoose";

export interface TFerryRoute extends Document {
    start_point: string;
    end_point: string;
    name: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
}