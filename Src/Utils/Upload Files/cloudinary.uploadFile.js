import { v2 as cloudinary } from 'cloudinary';
import dotenv from "dotenv";

dotenv.config();

console.log("============== CLOUDINARY DEBUG ==============");
console.log("Cloud Name Loaded:", process.env.CLOUD_NAME); 
console.log("API Key Loaded:", process.env.API_KEY);
console.log("tSecret Loaded:", process.env.SECRET_KEY ? "Yes (Hidden)" : "NO ❌");
console.log("============================================");
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.SECRET_KEY
});

export default cloudinary;


