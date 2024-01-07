import mongoose from "mongoose";
import  Color  from "colors";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to mongodb server".bgBlue.white);
    } catch (error) {
        console.log(`There is a error in mongodb ${error}`.bgRed.white);
    }
}

export default connectDB;