import { Document, Types } from "mongoose";

export interface TLocation extends Document {
    lattitude: string;
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