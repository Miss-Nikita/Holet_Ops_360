const mongoose = require("mongoose")

const propertySchema = new mongoose.Schema({
    title:{
        type:String,
        required: true
    },
    descripton:{
        type:String,
        required: true
    },
    location:{
        type:String,
        required: true
    },
    price:{
        type:Number,
        required: true
    },
    amenities:
        {
type:[String],
default:[]
        },
        images:{
            type:[String],
            default:[]
        },
        host:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true
        }
    

},{timeseries:true})