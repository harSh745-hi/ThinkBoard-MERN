
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export  const connectDB = async () => {

    await mongoose.connect(process.env.MONGODB_URL)
    .then( ()=>{
        console.log("db connected successfully")
    })
    .catch(()=>{
        console.log("db issue")

        process.exit(1);  //exit with failure
    })
}