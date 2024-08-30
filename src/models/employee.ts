import mongoose from "mongoose";
import Branch from "./branch";
import FerryRoute from "./ferryRoute";
import { statusEnum } from "../helpers/enums";
import { TEmployee } from "../types/Employee";
import Location from "./location";
const { Schema } = mongoose;

interface IEmployee extends Document, TEmployee {}

const employeeSchema = new Schema<IEmployee>(
    {
        name: {
            type: String,
            require: true
        },
        emp_no: {
            type: String,
            require: true
        },
        nrc: {
            type: String,
            require: true
        },
        branch: {
            type: Schema.Types.ObjectId,
            ref: Branch,
            require: true
        },
        route: {
            type: Schema.Types.ObjectId,
            ref: FerryRoute
        },
        ferry_destination: {
            type: Schema.Types.ObjectId,
            ref: Location
        },
        status: {
            type: String,
            enum: statusEnum,
            default: "active"
        }
    },
    { timestamps: true }
);

employeeSchema.pre("find", function() {
    this.where({status: "active"});
});

employeeSchema.pre("findOne", function() {
    this.where({status: "active"});
});

export default mongoose.model<IEmployee>("Employee", employeeSchema);