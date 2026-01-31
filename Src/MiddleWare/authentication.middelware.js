import { userModel } from "../DataBase/Models/user.model.js";
import { verifyToken } from "../Utils/security/Token/tokenAuth.js";

const authentication=async (req,res,next)=>{
    const {authorization} =req.headers
    const [bearer,token]=authorization.split(" ")[1]
    if(!authorization || !bearer == "Bearer" || !token){
        return next(new Error("not authentcation (token or bearer not found)",{case:401}))
    }
    const {id}=await verifyToken({token})
    const user=await userModel.findById(id).lean()
    if(!user){
     return next(new Error("user not found in DataBase",{case:404}))
    }

    req.user=user
    return next()
}
export default authentication





