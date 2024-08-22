import { Document, Types } from "mongoose";

export interface TEmployee extends Document {
    name: string;
    emp_no: string;
    nrc: string;
    branch: Types.ObjectId;
    status: string;
    createdAt: Date;
    updateAt: Date;
}