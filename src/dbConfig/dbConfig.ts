import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export async function connect()
{
    try {
        const mongoUri =process.env.MONGO_URI ;
        if(!mongoUri){
            throw new Error("MongoDB URI is not defined");
        }
        await mongoose.connect(mongoUri);

        const connection = mongoose.connection;

        connection.on('connected', ()=>{
            console.log("Mongodb connected successfully");
        })

        connection.on('error', (err)=>{
            console.log('MongoDB connection error. Please make sure Mongodb is running' + err);
            process.exit();
        })

    } catch (error) {
        console.log("Error caught");
        console.log(error);
    }
}