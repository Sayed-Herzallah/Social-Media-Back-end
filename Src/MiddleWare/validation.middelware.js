export const validation = (schema)=>{

return (req,res,next)=>{
    const data ={...req.body,...req.query,...req.params}
    if(req.file || req.files?.lenght){
      data.file=req.file || req.files
    }
    const result=schema.validate(data,{abortEarly:false})
    if(result.error){
   const errorMessages=result.error.details.map((obj)=>obj.message)
   return res.status(400).json({success:false,message:"error in validation data please try again",errorMessages})
    }
    return next();
}
}




