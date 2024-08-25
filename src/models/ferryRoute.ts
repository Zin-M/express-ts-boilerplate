import mongoose from "mongoose";
import { statusEnum } from "../helpers/enums";
import { TFerryRoute } from "../types/FerryRoute";
import Location from "./location";

const { Schema } = mongoose;

interface IFerryRoute extends Document, TFerryRoute {}

const ferryRouteSchema = new Schema<IFerryRoute>(
    {
        start_point: {
            type: Schema.Types.ObjectId,
            ref: Location,
            require: true
        },
        end_point: {
            type: Schema.Types.ObjectId,
            ref: Location,
            require: true
        },
        name: {
            type: String,
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

ferryRouteSchema.pre("find", function() {
    this.where({status: "active"});
});

ferryRouteSchema.pre("findOne", function() {
    this.where({status: "active"});
});

export default mongoose.model<IFerryRoute>("FerryRoute", ferryRouteSchema);