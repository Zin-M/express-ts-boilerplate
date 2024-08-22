import { Document } from "mongoose";

export interface TCompany extends Document {
  name: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}
