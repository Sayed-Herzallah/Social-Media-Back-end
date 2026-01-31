// ==================================== token auth ==========================================

// ===================================== import module =======================================
import jsonwebtoken from "jsonwebtoken";

// ===================================== generate token =======================================
export const generateToken=async ({payload,secretToken=process.env.JWT_SECRET,options={}})=>{
    return jsonwebtoken.sign(payload,secretToken,options)
}

// ===================================== verify token =======================================
export const verifyToken=async ({token,secretToken=process.env.JWT_SECRET})=>{
    return jsonwebtoken.verify(token,secretToken)
}