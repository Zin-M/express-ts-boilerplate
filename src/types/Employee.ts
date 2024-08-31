import { Document, Types } from "mongoose";

export interface TEmployee extends Document {
    name: string;
    emp_no: string;
    nrc: string;
    branch: Types.ObjectId;
    route: Types.ObjectId;
    ferry_destination: Types.ObjectId;
    password: string;
    status: string;
    createdAt: Date;
    updateAt: Date;
}