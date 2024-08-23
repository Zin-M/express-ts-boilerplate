import { Document, Types } from "mongoose";

export interface TLocation extends Document {
    latitude: string;
    longitude: string;
    nrc: string;
    branch: Types.ObjectId;
    employee: Types.ObjectId;
    driver: Types.ObjectId;
    ferryRoute: Types.ObjectId;
    status: string;
    createdAt: Date;
    updatedAt: Date;
}