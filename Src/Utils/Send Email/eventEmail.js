// ======================================= event email (Event Emitter) =======================================

// ======================================= import modules =======================================
import EventEmitter from "node:events"
import { sendEmails } from "./sendEmail.js";
import templet from "./generateHTML.js";
// ======================================= new event =======================================
export const eventEmitter = new EventEmitter();
// ======================================= event on =======================================
eventEmitter.on('sendEmail', async ({ userName, email,otp ,subjects}) => {
    // const otp = customAlphabet("0123456789TEAMSALEK",6)()
    // const hashOtpDB = hashPassword({ plainText: otp})
    // await userModel.updateOne({ email }, { OTPHASH: hashOtpDB })
    
    // ============================================= send email=======================================
    await sendEmails({ to:email, subject:subjects, html: templet({userName, otp}) })
});


