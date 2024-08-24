import mongoose from "mongoose";
import { statusEnum } from "../helpers/enums";
import { TLocation } from "../types/Location";

const { Schema } = mongoose;

interface ILocation extends Document, TLocation {}

const locationSchema = new Schema<ILocation>(
  {
    latitude: {
      type: String,
      require: true,
    },
    longitude: {
      type: String,
      require: true,
    },
    name: {
      type: String,
      require: true,
    },
    address: {
      type: String,
    },
    status: {
      type: String,
      enum: statusEnum, // Use the enum to restrict values
      default: "active",
    },
  },
  { timestamps: true }
);

locationSchema.pre("find", function () {
  this.where({ status: "active" });
});

locationSchema.pre("findOne", function () {
  this.where({ status: "active" });
});

export default mongoose.model<ILocation>("Location", locationSchema);
