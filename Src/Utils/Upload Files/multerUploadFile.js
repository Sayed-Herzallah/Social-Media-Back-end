// =============================== import module ================================
// import multer from "multer"
// import {  nanoid } from "nanoid"
// import fs from "fs"
// import path from "path"
import multer from "multer"


// ====================================== export module (file upload Filter) ================================
// export const custom={
//     images:["image/jpeg","image/png"],
//     pdf:["application/pdf"],
//     video:["video/mp4"],
//     audio:["audio/mp3"]
// }
// // ====================================== export function upload file ================================================
// export const uploadFile =(customValidation=[],customPath) => {
 
//  // =============================== upload file (storage) ================================
//     const storage = multer.diskStorage({
//         destination: (req, file, cb) => {
//             let baseUrl=`update/${customPath}`
//         const updatePath=path.join(`./${baseUrl}`,req.user._id.toString())
//         if(!fs.existsSync(updatePath)){
//         fs.mkdirSync(updatePath,{recursive:true})
//        }    
//         cb(null,updatePath)
//         },
//         filename: (req, file, cb) => {
//             cb(null,Date.now() + "__" + nanoid() + "__" + file.originalname)
//         }
//     })
// //  =============================== upload file (file filter) ================================
//     function fileFilter (req, file, cb) {

//   if (customValidation.includes(file.mimetype)) {
//     cb(null,true)
//   } else {
//     cb(new Error("Not Allowed Upload File Type"))
//   }

// }
// 




//=============================== upload file (middleware) ================================
    // const uploadMulter=multer({ storage,fileFilter })
    // return uploadMulter
// }


export const uploadFile= ()=>{

  const storage = multer.diskStorage({

  })
  
  const upload = multer({ storage })
  return upload
  
}









