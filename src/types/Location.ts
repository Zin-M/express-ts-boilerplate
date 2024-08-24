import { Document, Types } from "mongoose";

export interface TLocation extends Document {
    latitude: string;
    longitude: string;
    name:string;
    address:string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
}