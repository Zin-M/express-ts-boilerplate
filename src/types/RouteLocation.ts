import { Document, Types } from "mongoose";

export interface TRouteLocation extends Document {
    route_id: Types.ObjectId;
    location_id: Types.ObjectId;
    sr_no: number;
    status: string;
    createdAt: Date;
    updatedAt: Date;
}