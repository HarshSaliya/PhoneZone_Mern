import mongoose from "mongoose";


const PhoneSchema = mongoose.Schema({
     //id:{type: Number , require:true},
     name: { type: String, required: true },
     title: { type: String, required: true },
     price: { type: Number, required: true },
     category: { type: String, required: true },
     image: { type: String, required: true }
   });

const Phone =mongoose.model('Phone' , PhoneSchema)
export default Phone;