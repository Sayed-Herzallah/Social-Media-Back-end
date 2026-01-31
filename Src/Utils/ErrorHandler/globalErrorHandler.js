// ==================================== global error handler (middelware ERROR Handler Global) ======================================
export const globalErrorHandler = (error,req,res,next)=>{
        // status code (Number Error)
        const status= error.cause || 500 ;
        // send response
        return res.status(status).json({success:false,message:error.message,stack:error.stack})
} 