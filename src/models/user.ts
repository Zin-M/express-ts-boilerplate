import mongoose from "mongoose";
import { statusEnum } from "../helpers/enums";
import Company from "./company";
import {TUser} from "../types/User";
const { Schema } = mongoose;

interface IUser extends Document, TUser {}

const userSchema = new Schema<IUser>(
    {
        name: {
            type: String,
            require: true,
        },
        password:{
            type:String,
            required:true
        },
        email:{
          type:String,
          required:true
        },
        company: {
            type: Schema.Types.ObjectId,
            ref: Company,
            required: false,
        },
        is_super:{
            type:Boolean,
            default:false,
        },
        status: {
            type: String,
            enum: statusEnum,
            default: "active",
        },

    },
    { timestamps: true }
);

userSchema.pre("find", function () {
    this.where({ status: "active" });
});

userSchema.pre("findOne", function () {
    this.where({ status: "active" });
});

export default mongoose.model<IUser>("User", userSchema);
