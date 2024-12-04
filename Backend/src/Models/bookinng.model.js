const mongoose = require("mongoose")


const bookingSchema = new mongoose.Schema(
    {
        property:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Property"
        },
        User:{
            
            type:mongoose.Schema.Types.ObjectId,
           ref:"Property"
        },
        checkInDate : {
            type:Data,
            required:true
        },
        checkOutDate : {
            type:Data,
            required:true
        },
        totalPrices : {
            type:Number,
            required:true
        },
        status:{
            type:String,
            enum:["Pending", "Confiremed","Cencelled"],
            default:"Pending"
        },
        rezorpayOrderID:{
            type:String
        }
    },{timeseries:true}
)