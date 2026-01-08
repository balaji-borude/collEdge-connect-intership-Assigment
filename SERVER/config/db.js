import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const MONGOURL = process.env.MONGOURL;
console.log("mongoUrl --> ",MONGOURL);

export const connect =async()=>{
    await mongoose.connect(MONGOURL)
    .then(()=>console.log("Db Connected Succesfully"))
    .catch((err)=>{console.log(`Issue in Db Connection -->${err}`)});

}