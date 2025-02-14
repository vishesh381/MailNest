import mongoose from "mongoose";

const connectDB = async () => {
    try {
        console.log("Connecting to MongoDB...");
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Mongodb connected successfully.');
    } catch (error) {
        console.error("MONGO_URI+++++: ", process.env.MONGO_URI);
        console.error("Error: ", error);
    }
}

export default connectDB;
