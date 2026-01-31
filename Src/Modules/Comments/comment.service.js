
import { v2 as cloudinary } from 'cloudinary';
import { postModel } from '../../DataBase/Models/post.model.js';
import { populate } from 'dotenv';
import { commentModel } from '../../DataBase/Models/comment.model.js';

/*
بالضبط كده! الله ينور عليك. القاعدة دي (شمال ويمين) هي الجوكر اللي هيمشيك في أي Database في الدنيا، سواء كانت NoSQL (زي MongoDB & Mongoose) أو SQL (زي MySQL & Sequelize).

تعال نثبت القاعدة دي في دماغك مع كل الميثودز (Methods) عشان ترتاح للأبد:

القاعدة الثابتة:
الشمال (Key): ده "اسم الخانة" في الداتابيز (زي ما مكتوب في الـ Schema أو الـ Table).

اليمين (Value): دي "المعلومة" اللي معاك (المتغير اللي في الكود).

db.users.find({ email: "ahmed@gmail.com" })

userModel.findOne({ 
    email: req.body.email,  // الشمال: خانة الإيميل في الداتا | اليمين: الإيميل اللي اليوزر كتبه
    age: 20                 // الشمال: خانة السن | اليمين: رقم 20
})

دلوقتي امتي تستخدم و تضبط اوبجكت واحد فقط اعمل !name
اما لو عندك لسته هتعمل اي بقي !name?.length
كده بتقوله لو الاسم مش جة ولو جه شوف طوله لو يساوي صفر كده فاضي  عرفني غير كده كمل بقي 
/ */
export const createComment= async (req,res,next)=>{
  const {id}=req.params
  const {user}=req
  const {text}=req.body
  const post = await postModel.findOne({_id:id,isDeleted:false})
  if(!post){
    return next(new Error("post not found", { cause: 404 }))
  }
  let images=[];
  if(req.file){
    const {secure_url,public_id}=await cloudinary.uploader.upload(req.file.path,{folder:`SocialMedia/users/${user._id}/posts/${post._id}/comments`})
    images.push({public_id,secure_url})
  }
  const comment=await commentModel.create({text:text,author:user._id,post:post._id,Image:images})
  return res.status(200).json({success:true, message: "success create comment",result:{comment}})
}

export const updateComment =async (req,res,next)=>{
  const {commentId}=req.params
  const {text}=req.body
  const {user}=req
  
  const comment=await commentModel.findOne({_id:commentId,author:user._id})
  if(!comment){
    return next(new Error("comment not found", { cause: 404 }))
  }
  const post = await postModel.findOne({_id:comment.post._id,isDeleted:false})
  if(!post){
    return next(new Error("post not found", { cause: 404 }))
  }
  if(user._id.toString() !== comment.author.toString()){
    return next(new Error("unauthorized", { cause: 403 }))
  }
  if (req.file) {
    const { secure_url, public_id } = await cloudinary.uploader.upload(req.file.path, {
      folder: `SocialMedia/users/${user._id}/posts/${comment.post._id}/comments`
    });
    // هل يوجد صورة في الكومنت و كمان هل هي فاضية ولا اكبر من صفر 
    // معني هل يوجد .
    // comments: ده "الصندوق" (دايماً بيرجع [] لو مفيش داتا، مش بيرجع null).
    
    // comments.length: ده "العداد" (دايماً بيرجع رقم 0 لو الصندوق فاضي).
        if (comment.image && comment.image.length > 0) {
            await cloudinary.uploader.destroy(comment.image.public_id);
        }
   comment.image = { public_id, secure_url };
      }

  comment.text=text
  await comment.save()
  return res.status(200).json({success:true, message: "success update comment",result:comment})
}
// =============== soft delete comment ================
export const softDeleteComment =async (req,res,next)=>{
  const {commentId}=req.params
  const {user}=req
  const comment=await commentModel.findOne({_id:commentId,author:user._id})
  if(!comment){
    return next(new Error("comment not found", { cause: 404 }))
  }
  comment.isDeleted=true
  comment.deletedBy=user._id
  await comment.save()
  return res.status(200).json({success:true, message: "success soft delete comment",result:comment})
}
// ================= get single post show all comments================
export const getSinglePost   =async (req,res,next)=>{
  const {id}=req.params
  const post=await postModel.findOne({_id:id,isDeleted:false}).populate("comments")
  if(!post){
    return next(new Error("post not found", { cause: 404 }))
  }
  return res.status(200).json({success:true, message: "success get single comment",result:post})
}

// ================= get all comments ================
export const getAllComments =async (req,res,next)=>{
  const comments=await commentModel.find({isDeleted:false}).populate("post")
  if(!comments?.length){
    return next(new Error("comments not found", { cause: 404 }))
  }
  return res.status(200).json({success:true, message: "success get all comments",result:comments})
}
// ================= like unlike comment ================ 
export const likeComment =async (req,res,next)=>{
  const {commentId}=req.params
  const {user}=req
  const comment=await commentModel.findOne({_id:commentId,isDeleted:false}).populate({
    path:"user",
    select:"userName image"
  })
  if(!comment){
    return next(new Error("comment not found", { cause: 404 }))
  }
  const likes=[]
  const like= comment.likes.find((id)=>id.toString()==user._id.toString())
  if(like){
    comment.likes=comment.likes.filter((like)=>like.toString()!==user._id.toString())
  }else{
    comment.likes.push(user._id)
  }
  await comment.save()
  
  return res.status(200).json({success:true, message:like?"unlike comment":"like comment",result:comment})
}

// ================= delete comment ================ 
export const deleteComment =async (req,res,next)=>{
  const {commentId}=req.params
  const {user}=req
  const comment=await commentModel.findOne({_id:commentId,author:user._id})
  if(!comment){
    return next(new Error("comment not found", { cause: 404 }))
  }
  await comment.remove()
  return res.status(200).json({success:true, message: "success delete comment",result:comment})
}
//======================= add reply ====================== //
export const addReply =async (req,res,next)=>{
  const {commentId}=req.params
  const {text}=req.body
  const {user}=req
  const comment=await commentModel.findOne({_id:commentId,post:post._id,isDeleted:false}).populate({
    path:"user",
    select:"userName image"
  })
  if(!comment){
    return next(new Error("comment not found", { cause: 404 }))
  }
  const post=await postModel.findOne({_id:comment.post._id,isDeleted:false}).populate({
    path:"user",
    select:"userName image"
  })
  if(!post){
    return next(new Error("post not found", { cause: 404 }))
  } 
  let imgae;
  if (req.file) {
    const { secure_url, public_id } = await cloudinary.uploader.upload(req.file.path, {
      folder: `SocialMedia/users/${user._id}/posts/${post.id}/comments/${comment.id}`,
    });
    imgae = { public_id, secure_url };
  }
  const reply=await commentModel.create({...req.body,author:user._id,post:post._id,comment:comment._id})
  return res.status(200).json({success:true, message: "success add reply",result:reply})
}



