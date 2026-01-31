// ====================================== auth validation Data ================================
// ======================================      import modules       =======================================
import Joi from "joi";

// ====================================== register user (validation) ================================================
export const registerSchema = Joi.object({
    userName:Joi.string().min(3).max(20).trim().required(),
    email:Joi.string().email().lowercase().trim().required(),
    phone:Joi.string().trim().required(),
    password:Joi.string().min(8).required(),
    confirmPassword:Joi.string().valid(Joi.ref("password")).required(),
    address:Joi.string(),
    DOB:Joi.date(),
    file:Joi.object({
        fieldname:Joi.string().valid("file").required(),
        originalname:Joi.string().required(),
        encoding:Joi.string().required(),
        mimetype:Joi.string().required(),
        size:Joi.number().required(),
        destination:Joi.string().required(),
        filename:Joi.string().required(),
        path:Joi.string().required(),
        // buffer:Joi.binary().required()
    })
})

// ====================================== login user (validation) ================================================
export const loginSchema = Joi.object({
    email:Joi.string().email().lowercase().trim().required(),
    password:Joi.string().min(8).required(),
})
// ====================================== verify email (validation) ================================================
export const verifyEmailSchema= Joi.object({
    email:Joi.string().email().lowercase().trim().required(),
    code:Joi.string().required()
})
// ====================================== forget password (validation) ================================================
export const forgetPasswordSchema=Joi.object({
    email:Joi.string().email().lowercase().trim().required()
})

//  ====================================== refresh token (validation) ================================================
export const RefreshTokenGenerate=Joi.object({
    refreshToken:Joi.string().required(),
}).required()

// ====================================== reset password (validation) ================================================
export const resetPasswordSchema= Joi.object({
    email:Joi.string().email().lowercase().trim().required(),
    code:Joi.string().required(),
    password:Joi.string().min(8).required(),
    confirmPassword:Joi.string().valid(Joi.ref("password")).required(),
}).required()

// ========================================= update Email (validation) =================================================
export const updateEmail=Joi.object({
   email:Joi.string().email().required(),
   password:Joi.string().min(8).required()
}).required()