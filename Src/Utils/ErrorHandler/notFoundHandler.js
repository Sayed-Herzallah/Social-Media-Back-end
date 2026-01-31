// ===================================== not found handler (middelware ERROR Handler Not Found Router) ======================================
export const notFoundHandler=(req,res,next)=>{
    // send response
    return next (new Error("not found handler",{case:404}))
}