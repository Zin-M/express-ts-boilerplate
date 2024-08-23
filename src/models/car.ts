import mongoose from "mongoose";
import { TCar } from "../types/Car";
import { statusEnum } from "../helpers/enums";
import Branch from "./branch";
const { Schema } = mongoose;

interface ICar extends Document, TCar {}

const carSchema = new Schema<ICar>(
    {
        car_no: {
            type: String,
            require: true
        },
        color: {
            type: String,
            require: true
        },
        branch: {
            type: Schema.Types.ObjectId,
            ref: Branch,
            require: true
        },
        status: {
            type: String,
            enum: statusEnum, // Use the enum to restrict values
            default: "active",
          },
    },
    { timestamps: true }
);

carSchema.pre("find", function() {
    this.where({status: "active"});
});

carSchema.pre("findOne", function() {
    this.where({status: "active"});
});

export default mongoose.model<ICar>("Car", carSchema);