
// ======================================= import modules =======================================
import { Router } from "express";
import * as authServices from "./auth.services.js";
import { validation } from "../../MiddleWare/validation.middelware.js";
import * as authValidation from "./auth.validation.js"
import { asyncHandler } from './../../Utils/ErrorHandler/asyncHandler.js';
import authentication from "../../MiddleWare/authentication.middelware.js";
// import {  custom, uploadFile } from "../../Utils/Upload Files/multerUploadFile.js";
import { authEndpoined } from "./auth.endpoined.js";
import { authorization } from "../../MiddleWare/autherization.middelware.js";
import { uploadFile } from "../../Utils/Upload Files/multerUploadFile.js";
// ================================== start router (All Endpoined) =======================================
const router=Router()

// ======================================= Register user (endpoined) ================================================
router.post("/register",uploadFile().single("file"),validation(authValidation.registerSchema),asyncHandler(authServices.registerUser))

// ==================================== Login user (endpoined) =====================================================
router.post("/login",validation(authValidation.loginSchema),asyncHandler(authServices.loginUser))

// ====================================== verify email (endpoined)========================================
router.patch("/verify",validation(authValidation.verifyEmailSchema),asyncHandler(authServices.verifyEmail))

// ========================================== forget password (endpoined) ===================================
router.post("/forgetPassword",validation(authValidation.forgetPasswordSchema),asyncHandler(authServices.frogetPassword))

// =============================== reset password || confirm password (endpoined) ===================================
router.patch("/resetPassword",validation(authValidation.resetPasswordSchema),asyncHandler(authServices.resetPassword))

// ================================= change Password (endpoined)================================================
// router.patch("/changePassword",authentication,validation(authValidation.changePasswordSchema),authServices.changePassword)

// ================================ refersh token (endpoined) ==================================
router.post("/refershToken",validation(authValidation.RefreshTokenGenerate),asyncHandler(authServices.refershToken))

// router.post("/images",authentication,uploadFile(custom.images,"users").array("images",10),asyncHandler(authServices.uploadFiles))

// router.patch("/updateEmail",authentication,authorization(authEndpoined.updateEmail),asyncHandler(authServices.updateEmail))

router.patch("/updateEmail",authentication,authorization(authEndpoined.updateEmail),validation(authValidation.updateEmail),asyncHandler(authServices.updateEmail))
router.delete("/deletePhoto",authentication,asyncHandler(authServices.deletePhoto))


// ================================   default export router All Endpoined =================
export default router