import mongoose from "mongoose";

async function connectDB() {
    try {
        await mongoose.connect();
    } catch(e) {
        console.log(e);
    }
}

export default connectDB;