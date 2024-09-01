import mongoose from "mongoose";
import connectDB from "../db/connection";
import User from "../models/user"
import bcrypt from "bcrypt";

const seedAdmin = async () => {
    await connectDB();

    const superAdmin =
        {
            name: "Super Admin",
            email:"admin@mail.com",
            password:await bcrypt.hash('P@ssw0rd', 10),
            is_super: true,
            status: "active",
        }

    try {
        await User.deleteMany({email:"admin@mail.com",is_super:true});

        await  User.create(superAdmin)
        console.log("Seed data inserted successfully!");
    } catch (err) {
        console.error("Error seeding data:", err);
    } finally {
        await mongoose.connection.close();
    }
};

seedAdmin();
