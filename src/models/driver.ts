import mongoose from "mongoose";
import Branch from "./branch";
import { statusEnum } from "../helpers/enums";
import { TDriver } from "../types/Driver";
import Car from "./car";

const { Schema } = mongoose;

interface IDriver extends Document, TDriver {}

const driverSchema = new Schema<IDriver>(
    {
        name: {
            type: String,
            require: true
        },
        branch: {
            type: Schema.Types.ObjectId,
            ref: Branch,
            require: true
        },
        car: {
            type: Schema.Types.ObjectId,
            ref: Car,
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

driverSchema.pre("find", function() {
    this.where({status: "active"});
});

driverSchema.pre("findOne", function() {
    this.where({status: "active"});
});

export default mongoose.model<IDriver>("Location", driverSchema);