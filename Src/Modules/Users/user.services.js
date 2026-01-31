// ================== import module ==================
import userModel from "../../DataBase/Models/user.model.js"
import { Types } from "mongoose";
import { hashPassword } from "../../Utils/security/Hashing/hashPassword.js";
import { generateToken } from "../../Utils/security/Token/tokenAuth.js";
import { eventEmitter } from "../../Utils/Send Email/eventEmail.js";
import { subject } from "../../Utils/Send Email/sendEmail.js";
import { encryptPhone } from "../../Utils/security/Encryption/encryptPhone.js";
// ==================== update user ==================
export const updateUser = async (req, res, next) => {
  const { userName, email, phone, address, DOB } = req.body
  const { id } = req.params
  const user = await userModel.findOne({ _id: id })
  if (!user) {
    return next(new Error("user not found", { cause: 404 }))
  }
  const encryptedPhone = await encryptPhone({ plainText: phone });
  const passwordHash = await hashPassword({ plainText: req.body.password })
  const updatedUser = await userModel.findOneAndUpdate({ _id: id }, { userName, email, phone: encryptedPhone, password: passwordHash, address, DOB }, { new: true })
  return res.status(200).json({ success: true, message: "success update user", result: updatedUser })
  }
  // ================= delete user ==================
  export const deleteUser = async (req, res, next) => {
    const { id } = req.params
    const user = await userModel.findOne({ _id: id })
    if (!user) {
      return next(new Error("user not found", { cause: 404 }))
    }
    await userModel.findOneAndDelete({ _id: id })
    return res.status(200).json({ success: true, message: "success delete user" })
  }
  // ========================= reset password =========================
  export const resetPassword = async (req, res, next) => {
    const { id } = req.params
    const { password } = req.body
    const user = await userModel.findOne({ _id: id })
    if (!user) {
      return next(new Error("user not found", { cause: 404 }))
    }
    const passwordHash = await hashPassword({ plainText: password })
    await userModel.findOneAndUpdate({ _id: id }, { password: passwordHash })
    return res.status(200).json({ success: true, message: "success reset password" })
  }
// ======================== forget pass ==========================
export const forgetPassword = async (req, res, next) => {
  const { email } = req.body
  const user = await userModel.findOne({ email })
  if (!user) {
    return next(new Error("user not found", { cause: 404 }))
  }
  // const otp = Math.floor(Math.random() * (9999 - 1000 + 1) + 1000);
  // const otpHash = await hashPassword({ plainText: otp.toString() })
  const otp = customAlphabet("0123456789TEAMSALEK", 6)()
  const otpHash = await hashPassword({ plainText: otp })
  await userModel.findOneAndUpdate({ email }, { otp: otpHash })
  eventEmitter.emit('sendEmail', { userName: user.userName, email, otp, subjects: subject.forgetPassword })
  return res.status(200).json({ success: true, message: "success send otp to email" })
}