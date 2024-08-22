import { Document, Types } from "mongoose";

export interface TBranch extends Document {
  name: string;
  company: Types.ObjectId; // Use Types.ObjectId for references
  status: string;
  start:String;
  end:String;
  createdAt: Date;
  updatedAt: Date;
}
