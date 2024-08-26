import { Document, Types } from "mongoose";

export interface TRouteLocation extends Document {
    route: Types.ObjectId;
    stop_location: Types.ObjectId;
    sr_no: number;
    status: string;
    createdAt: Date;
    updatedAt: Date;
}