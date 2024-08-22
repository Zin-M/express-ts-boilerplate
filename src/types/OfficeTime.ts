import { Document, Types } from "mongoose";

export interface TOfficeTime extends Document {
    branch: Types.ObjectId;
    start:String;
    end:String;
    status: string;
    createdAt: Date;
    updatedAt: Date;
}
