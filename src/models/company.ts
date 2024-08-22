import mongoose from "mongoose";
import { statusEnum } from "../helpers/enums";
import { TCompany } from "../types/Company";
const { Schema } = mongoose;

interface ICompany extends Document, TCompany {}

const companySchema = new Schema<ICompany>(
  {
    name: {
      type: String,
      require: true,
      unique: true,
    },
    status: {
      type: String,
      enum: statusEnum, // Use the enum to restrict values
      default: "active",
    },
  },
  { timestamps: true }
);

companySchema.pre("find", function () {
  this.where({ status: "active" });
});

companySchema.pre("findOne", function () {
  this.where({ status: "active" });
});

export default mongoose.model<ICompany>("Company", companySchema);
