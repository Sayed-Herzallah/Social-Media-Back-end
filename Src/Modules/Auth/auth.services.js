// ======================================== import modules =======================================
import { userModel } from "../../DataBase/Models/user.model.js";
import { hashPassword, verifyPassword } from "../../Utils/security/Hashing/hashPassword.js";
import { eventEmitter } from './../../Utils/Send Email/eventEmail.js';
import { generateToken, verifyToken } from './../../Utils/security/Token/tokenAuth.js';
import {otpModel} from '../../DataBase/Models/otp.model.js'
import { customAlphabet } from "nanoid";
import { subject } from "../../Utils/Send Email/sendEmail.js";
import {v2 as cloudinary} from "cloudinary"
import { encryptPhone } from "../../Utils/security/Encryption/encryptPhone.js";
// import fs from "fs"
import path from "path"
// ======================================= register user ========================================
// export const registerUser = async (req, res, next) => {
//     const { userName, email, phone, password, address, DOB } = req.body
//     const userFind = await userModel.findOne({ email })
//     // check if user already exist
//     if (userFind) {
//         return next(new Error("user already exist", { cause: 400 }))
//     }
//     // hash password
//     const passwordHash = await hashPassword({ plainText: password})
//     // encrypt phone
//      const encryptedPhone = await encryptPhone({ plainText: phone });
//     // create user in DataBase
//     const user = await userModel.create({ userName, email, phone: encryptedPhone, password: passwordHash, address, DOB})
//     if(req.file){
//       const {secure_url , public_id}=await cloudinary.uploader.upload(req.file.path,{folder:`SocialMedia/users/${user._id}/profile`})
//       user.image={public_id:public_id,secure_url:secure_url}
    
//     }
//     await user.save()

//     // send email to user (otp)
//     const otp = customAlphabet("0123456789TEAMSALEK", 6)()
//     eventEmitter.emit('sendEmail', { userName, email,otp,subjects:subject.verifyEmail})
//     // save otp in DataBase
//     await otpModel.create({email,otp ,typeOtp:"verifyEmail"})
//     res.status(201).json({ message: "success register user", user }).select("-password")
// }
export const registerUser = async (req, res, next) => {
    const { userName, email, phone, password, address, DOB } = req.body;

    // 1. Check Existence
    if (await userModel.findOne({ email })) {
        return next(new Error("User already exists", { cause: 400 }));
    }

    // 2. Hash & Encrypt
    const passwordHash = await hashPassword({ plainText: password });
    const encryptedPhone = await encryptPhone({ plainText: phone });

    // 3. Create User (مبدئياً بالصورة الديفولت اللي في الموديل)
    const user = await userModel.create({
        userName,
        email,
        phone: encryptedPhone,
        password: passwordHash,
        address,
        DOB
    });

    // 4. Check & Upload Image
    if (req.file) {
        // نرفع الصورة
        const { secure_url, public_id } = await cloudinary.uploader.upload(req.file.path, {
            folder: `SocialMedia/users/${user._id}/profile`
        });

        // نحدث اليوزر بالبيانات الجديدة
        user.image = { secure_url, public_id };
        
        // نحفظ التعديل
        await user.save();
    }

    // 5. OTP & Response
    const otp = customAlphabet("0123456789TEAMSALEK", 6)();
    eventEmitter.emit('sendEmail', { userName, email, otp, subjects: subject.verifyEmail });
    await otpModel.create({ email, otp, typeOtp: "verifyEmail" });

    // هنا بنرجع اليوزر بعد التحديثات
    res.status(201).json({ message: "success register user", user });
};


//======================================== login user ==========================================
export const loginUser = async (req, res, next) => {
    const { email, password } = req.body
    const user = await userModel.findOne({ email })
    if (!user) {
        return next(new Error("user not found", { cause: 404 }))
    }
    if (!user.confirmEmail ) {
        return next(new Error("user not active", { cause: 409 }))
    }
    const validPass = await verifyPassword({plainText: password, hash: user.password});
if (!validPass) {
    return next(new Error("invalid password", { cause: 400 }))
}

    const AccessToken=await generateToken({payload:{id:user._id,role:user.role,email:user.email},options:{expiresIn:process.env.ACCESS_TOKEN_EXPIRE}})
    const RefershToken=await generateToken({payload:{id:user._id,role:user.role,email:user.email},options:{expiresIn:process.env.REFERSH_TOKEN_EXPIRE}})
    const generate={AccessToken,RefershToken}
    return res.status(200).json({success:true, message: "success login user",result:generate})
}


// ===================================== verify email ======================================
export const verifyEmail = async (req, res, next) => {
    const { email, code } = req.body
    
    const user = await userModel.findOne({ email })
    if (!user) {
        return next(new Error("user not found", { cause: 404 }))
    }
    if (user.confirmEmail == true) {
        return next(new Error("user already active", { cause: 409 }))
    }
    // const send= customAlphabet("0123456789TEAMSALEK",6)()
    // const hashOTBDB=await hashPassword({plainText:send})
    // await otpModel.updateOne({email},{HashOTP:hashOTBDB})
    // if (!verifyPassword({ plainText: otp, hash: otpModel.HashOTP })) {
        //     return next(new Error("invalid otp", { cause: 400 }))
        // }
        const search=await otpModel.findOne({email,otp:code,typeOtp:"verifyEmail"})
        if(!search){
            return next(new Error("invalid otp or email", { cause: 400 }))
        }
        await userModel.findOneAndUpdate({email:user.email}, { confirmEmail: true})
    res.status(200).json({ message: "active user email" })
}
// ==================================== refersh token ======================================
export const refershToken =async (req,res,next)=>{
const {refreshToken}=req.body
const payload=await verifyToken({token:refreshToken})
const user=await userModel.findOne({_id:payload.id})
if(!user) {
    return next(new Error("user not found", { cause: 404 }))
}
const generateAccessToken=await generateToken({payload:{id:user._id,role:user.role,email:user.email},options:{expiresIn:process.env.ACCESS_TOKEN_EXPIRE}})
return res.status(200).json({success:true, message: "success refersh token to generate accessToken",result:generateAccessToken})
}
// ==================================== froget password ======================================
export const frogetPassword= async (req,res,next)=>{
    const{email}=req.body
    const user=await userModel.findOne({email})
    if(!user){
        return next (new Error ("user not found email", {cause:404}))
    }
    if(!user.confirmEmail){
        return next (new Error ("user not active", {cause:409}))
    }
    const otpGenerate=  customAlphabet("0123456789TEAMSALEK",6)()
    await otpModel.create({email,otp:otpGenerate,typeOtp:"forgetPassword"})
    eventEmitter.emit('sendEmail', { userName: user.userName, email: user.email, otp: otpGenerate ,subjects:subject.forgetPassword})
    return res.status(200).json({success:true, message: "success send otp to email"})
}
// ==================================== reset password ======================================
export const resetPassword = async (req,res,next)=>{
    const {email,code ,password}=req.body
    const user=await userModel.findOne({email})
    if(!user){
        return next (new Error ("user not found email", {cause:404})) 
    }
    const check=await otpModel.findOne({email,otp:code,typeOtp:"forgetPassword"})
    if(!check){
     return next (new Error ("invalid otp", {cause:400}))
    }
    const passwordHash=await hashPassword({plainText:password})
    await userModel.findOneAndUpdate({email:user.email},{password:passwordHash})
    return res.status(200).json({success:true, message: "try login now because your password has been changed"})
}
// ===================================== upload files ===========================================
/* ملخص الخطوات
1-بحث عن المستخدم
2-اضافة الملفات الى المصفوفة
3-حفظ المصفوفة
*/
export const uploadFiles=async (req,res,next)=>{
    // const user=req.user
    const user= await userModel.findById(req.user._id)
    if(!user){
        return next(new Error("user not found", { cause: 404 }))
    }
    // user.coverImage=req.files.map(file=>file.path)
    // console.log(req.files);
    user.coverImage = [...(user.coverImage) || [], ...req.files.map(file => file.path)]
    await user.save()

    
    // file single
    // if (req.file) {
    //     user.image = req.file.path
    //     await user.save()
    // }
    // array OR fileds
    /*
    user.nameAttribute=[...(user.nameAttribute || []),...(req.files.map(file)=>file.path)]
    */


    return res.status(200).json({success:true, message: "success upload files",result:{user}})
} 
// ===================================== update email ===========================================
export const updateEmail = async (req,res,next)=>{
    const {email,password}=req.body
    const check=await userModel.findOne({email})
    if(!check){
    return next(new Error("email Exits",{cause:409}))
    }
    const pass= await verifyPassword({plainText:password,hash:user.password})
    if(!pass){
  return next(new Error("Invalid Password",{cause:400}))
    }
    // await userModel.updateOne({email})
    return res.status(200).json({success:true,message:"Change Email Success"})
}
// ===================================== delete photo ===========================================
/*
ملخص الخطوات
1- تحقق من وجود المستخدم
2- حذف صورة المستخدم
3- تحديث صورة المستخدم
*/
export const deletePhoto = async(req,res,next)=>{
  const user=await userModel.findById(req.user._id)
  if(!user){
    return next(new Error("user not found", { cause: 404 }))
  }
  const imgPath=path.resolve(".",user.image)
  if(fs.existsSync(imgPath)){
    return next(new Error("image not found", { cause: 404 }))
  }else{
      user.image=Default.imageDefault
      await user.save()
  }
  return res.status(200).json({success:true, message: "success delete photo"})
}