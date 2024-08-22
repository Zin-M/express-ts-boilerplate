import mongoose from "mongoose";
import { statusEnum } from "../helpers/enums";
import { TFerryRoute } from "../types/FerryRoute";
const { Schema } = mongoose;

interface IFerryRoute extends Document, TFerryRoute {}

const ferryRouteSchema = new Schema<IFerryRoute>(
    {
        startPoint: {
            type: String,
            require: true
        },
        endPoint: {
            type: String,
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