import mongoose from "mongoose";
import Branch from "./branch";
import { statusEnum } from "../helpers/enums";
import { TEmployee } from "../types/Employee";
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