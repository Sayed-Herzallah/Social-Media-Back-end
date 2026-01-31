// ====================================== otp model ================================
import mongoose from "mongoose";
export const otpSchema = new mongoose.Schema({
   
   userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
  },
  email:{
      type: String,
      required: true,
   },
   otp:{
      type: String,
      required: true,
   },
   typeOtp:{
      type:String,
      required: true,
      enum:["forgetPassword","verifyEmail"]
   }
},
// ========================== timestamps(Start Option) ================================
{timestamps:true})
// ========================== index (Start Option Start) ================================
otpSchema.index({createdAt:1},
   {expireAfterSeconds:1000})
   // ====================== model OTP =============================================
 export const otpModel = mongoose.model("OTP",otpSchema)
