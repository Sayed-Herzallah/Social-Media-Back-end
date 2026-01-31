// =========================================== nodemailer =====================================

// ===================================== import modules =======================================
import nodemailer from "nodemailer";
import dotenv from "dotenv";
// ===================================== config dotenv (Read env Data) =======================================
dotenv.config()
// ====================================== send emails =======================================
export const sendEmails = async({to,subject,html})=>{

// ====================================== create transporter ================================
const  transporter = nodemailer.createTransport({
 service: "gmail",
  auth: {
    user:process.env.EMAIL_GOOGLE,
    pass: process.env.PASS_GOOGLE,
  },
});


// ================================ info email and subject and html ===============================
  const info = await transporter.sendMail({
    from: `"Social Media Application"${process.env.EMAIL_GOOGLE}`,
    to,
    subject,
    html,
  });
  
}

// ====================================== subject emails account ================================
export const subject={
    forgetPassword:"forget password",
    resetPassword:"reset password",
    verifyEmail:"verify email"
}
