import { Document, Types } from "mongoose";

export interface TUser extends Document {
    name: string;
    email:string;
    password:string;
    company: Types.ObjectId;
    is_super:boolean;
    status: string;
    createdAt: Date;
    updatedAt: Date;
}
