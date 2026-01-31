// ==================================== asyncHandler (middelware ERROR Handler) ======================================
export const asyncHandler= (fn)=>{
    // Return a function 
    return (req,res,next)=>{
        // Run the function
     fn(req,res,next).catch((error)=>{
        // If the function throws an error
        return next(error)
     })
    }
    
}


