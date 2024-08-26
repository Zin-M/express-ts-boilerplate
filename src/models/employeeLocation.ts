import mongoose from "mongoose";
import { statusEnum } from "../helpers/enums";
import { TEmployeeLocation } from "../types/EmployeeLocation";
import Location from "./location";

const { Schema } = mongoose;

interface IEmployeeLocation extends Document, TEmployeeLocation {}

const employeeLocationSchema = new Schema<IEmployeeLocation>(
    {
        employee: {
            type: Schema.Types.ObjectId,
            ref: Location,
            require: true
        },
        stop_location: {
            type: Schema.Types.ObjectId,
            ref: Location,
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

employeeLocationSchema.pre("find", function() {
    this.where({status: "active"});
});

employeeLocationSchema.pre("findOne", function() {
    this.where({status: "active"});
});

export default mongoose.model<IEmployeeLocation>("EmployeeLocation", employeeLocationSchema);