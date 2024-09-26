import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import phoneroute from "./route/phoneroute.js";
import cors from "cors";
import userroute from "./route/userroute.js";
import cartroute from './route/cartroute.js';





dotenv.config();

const URI=process.env.MongoDBURI;
const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());


try{

    mongoose.connect(URI,{
 
        
    });
    console.log("connected to mongodb");

}catch (error){

    console.log("error :" ,error);
}




app.use("/phone" ,phoneroute);
app.use("/user" ,userroute);
app.use("/cart", cartroute);
app.use('/uploads', express.static('uploads'));






app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})