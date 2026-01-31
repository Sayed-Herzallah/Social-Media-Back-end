// import mongoose, {Schema} from "mongoose";
// // import { hashPassword } from "../../Utils/security/Hashing/hashPassword.js";
// // import path from "path";
// export const roleType={
//     user:"user",
//     admin:"admin"
// }
// export const genderType={
//     male:"male",
//     female:"female"
// }
// export const Default={
//    imageDefault:"upload/avatar.png"
// }
// export const userSchema = new Schema({
//    userName:{
//       type: String,
//       required: true,
//       minLength:[3,"name must be at least 3 characters"],
//       maxLength:[20,"name must be at most 20 characters"],
//       trim: true
//    },
//    // OTPHASH:String,
//    email:{
//     type: String,
//     required: true,
//     unique: true,
//     lowercase: true,
//     trim: true,
//     match:[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,"please enter a valid email"]
//    },
//    phone:{
//     type: String,
//    required: true,
//    trim: true,
//   //  match:[/^(01)[0-9]{9}$/,"please enter a valid phone number"]
//    },
//    password:{
//       type: String,
//       required: true,
//       minLength:[8,"password must be at least 8 characters"]
//    },
//    address:String,
//    DOB:Date,
//    role:{
//       type: String,
//       enum: Object.values(roleType),
//       default:roleType.user
//    },
//    gender:{
//       type: String,
//       enum:  Object.values(genderType)
//    },
//    isDeleted:{
//     type:Boolean,
//     default:false
//    },
//    confirmEmail:{
//       type:Boolean,
//       default:false
//    },
//    changeAt:Date,
//    image:{
//       secure_url:{type: String},
//       public_id:{type: String}
//    },
//    coverImage:[String]
// },{
//    timestamps: true
// })

// // userSchema.pre("save",async function(next){
// //    if(this.isModified("password")){
// //   this.password=hashPassword({plainText:this.password})
// // }  
// // return next() 
// // })
// // userSchema.pre("save", async function (next) {
// //   if (this.isModified("password")) {
// //     this.password = await hashPassword({ plainText: this.password });
// //   }
// //   next();
// // });


// export const userModel =  mongoose.model("User", userSchema);


import mongoose from 'mongoose'; // تأكد من الـ import

const userSchema = new mongoose.Schema({
    userName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true }, // لازم String عشان التشفير
    address: String,
    DOB: Date,
    
    // 👇 ركز هنا، ده التعديل الصح
    image: {
        secure_url: { 
            type: String, 
            default: 'https://res.cloudinary.com/dvor4802/image/upload/v1690000000/default-avatar.png' // رابط ديفولت شغال
        },
        public_id: { 
            type: String, 
            default: '' 
        }
    },
    // 👆
    
    confirmEmail: { type: Boolean, default: false },
    role: { type: String, default: 'user' },
    isDeleted: { type: Boolean, default: false },
    coverImage: []
}, { timestamps: true });

export const userModel = mongoose.model('User', userSchema);