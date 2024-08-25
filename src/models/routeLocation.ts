import mongoose from "mongoose";
import { statusEnum } from "../helpers/enums";
import { TRouteLocation } from "../types/RouteLocation";
import Location from "./location";
import FerryRoute from "./ferryRoute";

const { Schema } = mongoose;

interface IRouteLocation extends Document, TRouteLocation {}

const routeLocationSchema = new Schema<IRouteLocation>(
    {
        route_id: {
            type: Schema.Types.ObjectId,
            ref: FerryRoute,
            require: true
        },
        location_id: {
            type: Schema.Types.ObjectId,
            ref: Location,
            require: true
        },
        sr_no: {
            type: Number
        },
        status: {
            type: String,
            enum: statusEnum, // Use the enum to restrict values
            default: "active",
          },
    },
    { timestamps: true }
);

routeLocationSchema.pre("find", function() {
    this.where({status: "active"});
});

routeLocationSchema.pre("findOne", function() {
    this.where({status: "active"});
});

export default mongoose.model<IRouteLocation>("RouteLocation", routeLocationSchema);