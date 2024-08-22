import mongoose from "mongoose";
import { statusEnum } from "../helpers/enums";
import Company from "./company";
import { TBranch } from "../types/Branch";
const { Schema } = mongoose;

interface IBranch extends Document, TBranch {}

const branchSchema = new Schema<IBranch>(
  {
    name: {
      type: String,
      require: true,
    },
    company: {
      type: Schema.Types.ObjectId,
      ref: Company,
      required: true,
    },
    status: {
      type: String,
      enum: statusEnum,
      default: "active",
    },
    start: {
      type: String,
      required: true,
      validate: {
          validator: function(v: string) {
              return /^([01]\d|2[0-3]):([0-5]\d)(:[0-5]\d)?$/.test(v);
          },
          message: props => `${props.value} is not a valid time!`
      }
  },
  end: {
      type: String,
      required: true,
      validate: {
          validator: function(v: string) {
              return /^([01]\d|2[0-3]):([0-5]\d)(:[0-5]\d)?$/.test(v);
          },
          message: props => `${props.value} is not a valid time!`
      }
  },
  },
  { timestamps: true }
);

branchSchema.pre("find", function () {
  this.where({ status: "active" });
});

branchSchema.pre("findOne", function () {
  this.where({ status: "active" });
});

export default mongoose.model<IBranch>("Branch", branchSchema);
