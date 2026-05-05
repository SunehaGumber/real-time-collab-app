import mongoose from "mongoose";
import config from "./config.js";

async function connectDB() {
    try {
        const conn=await mongoose.connect(config.MONGO_URI);
        console.log("Database connected successfully!");
    } catch (err) {
        console.log('Error connecting to database!');
    }
}

export default connectDB;