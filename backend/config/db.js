// functionality working
import mongoose from "mongoose";
export const connectDB = async (req, res) =>{
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Database connected");
    } catch (error) {
        console.log(error);
        console.log('Database not connected');
        process.exit(1);
    }
}