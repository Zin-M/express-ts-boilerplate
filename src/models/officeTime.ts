import mongoose from "mongoose";
import { statusEnum } from "../helpers/enums";
import {TOfficeTime} from "../types/OfficeTime";
import Branch from "./branch";
const { Schema } = mongoose;

interface IOfficeTime extends Document, TOfficeTime {}

const officeTimeSchema = new Schema<IOfficeTime>(
    {
        branch: {
            type: Schema.Types.ObjectId,
            ref: Branch,
            required: true,
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
        status: {
            type: String,
            enum: statusEnum,
            default: "active",
        },
    },
    { timestamps: true }
);

officeTimeSchema.pre("find", function () {
    this.where({ status: "active" });
});

officeTimeSchema.pre("findOne", function () {
    this.where({ status: "active" });
});

export default mongoose.model<IOfficeTime>("OfficeTime", officeTimeSchema);
