import mongoose from "mongoose";

async function connectDB() {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.DATABASE_URI}/${process.env.DATABASE_NAME}`);
        if (connectionInstance) {
            console.log("MongoDB connection successfull !");
        }
    } catch (error) {
        console.log("An error occured while creating server: ", error);
        process.exit(1);
    }
}

export default connectDB;