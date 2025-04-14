import mongoose from "mongoose";

const { MONGO_CONNECTION_URL } = process.env;

export const db=async()=>{
    try {
        if(!MONGO_CONNECTION_URL){
            throw new Error("MongoDB connection URL is not defined");
        }
        const { connection } = await mongoose.connect(MONGO_CONNECTION_URL as string);
    if (connection.readyState === 1) {
      return Promise.resolve(true);
    }
    } catch (error) {
        console.error("MongoDB connection error:", error);
        return Promise.reject(error);
    }
    mongoose.connection.on("error", (err) => {
        console.error("MongoDB connection error:", err);
    })
    mongoose.connection.on("disconnected", () => {
        console.log("MongoDB disconnected");
    })
    mongoose.connection.on("connected", () => {
        console.log("MongoDB connected");
    })
    mongoose.connection.on("reconnected", () => {
        console.log("MongoDB reconnected");
    })
    mongoose.connection.on("close", () => {
        console.log("MongoDB connection closed");
    })
    mongoose.connection.on("timeout", () => {
        console.log("MongoDB connection timeout");
    })


}
