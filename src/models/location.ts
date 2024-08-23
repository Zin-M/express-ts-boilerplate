import mongoose from "mongoose";
import Branch from "./branch";
import { statusEnum } from "../helpers/enums";
import { TLocation } from "../types/Location";
import Employee from "./employee";
import FerryRoute from "./ferryRoute";
import Driver from "./driver";

const { Schema } = mongoose;

interface ILocation extends Document, TLocation {}

const locationSchema = new Schema<ILocation>(
    {
        latitude: {
            type: String,
            require: true
        },
        longitude: {
            type: String,
            require: true
        },
        branch: {
            type: Schema.Types.ObjectId,
            ref: Branch,
            require: true
        },
        employee: {
            type: Schema.Types.ObjectId,
            ref: Employee,
            require: true
        },
        driver: {
            type: Schema.Types.ObjectId,
            ref: Driver,
            require: true
        },
        ferryRoute: {
            type: Schema.Types.ObjectId,
            ref: FerryRoute,
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

locationSchema.pre("find", function() {
    this.where({status: "active"});
});

locationSchema.pre("findOne", function() {
    this.where({status: "active"});
});


export default mongoose.models.Location || mongoose.model<ILocation>("Location", locationSchema);