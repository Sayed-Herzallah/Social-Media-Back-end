// ===== ==================================== hash password ======================================

// ===================================== import module ========================================
import bcrypt from "bcrypt"

// ===================================== hash password ========================================
export const hashPassword =  ({plainText:password ,salt=Number(process.env.ROUNDS)})=>{
   return  bcrypt.hashSync(password,salt)
 }

//  ===================================== verify password ========================================
export const verifyPassword= ({plainText:password,hash:hashPassword})=>{
    return  bcrypt.compareSync(password,hashPassword)
}