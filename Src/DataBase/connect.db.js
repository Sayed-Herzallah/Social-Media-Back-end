import mongoose from "mongoose";
const connectDB = async ()=>{
try {
  await mongoose.connect(process.env.CONNECT_URL,{
    serverSelectionTimeoutMS:5000
  });
  console.log("success connect DataBase");
} catch (error) {
    console.log("failed connect DataBase");
    
}
}
export default connectDB