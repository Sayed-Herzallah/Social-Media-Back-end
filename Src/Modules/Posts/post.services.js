// import { userModel } from "../../DataBase/Models/user.model.js"
import { nanoid } from "nanoid"
import { postModel } from "../../DataBase/Models/post.model.js"
import {v2 as cloudinary} from "cloudinary"
import { commentModel } from "../../DataBase/Models/comment.model.js"
import { collapseTextChangeRangesAcrossMultipleVersions } from "typescript"

// ======================= create post =======================
export const createPost = async (req,res,next)=>{
 const {title,description}=req.body
 const {user}=req
 let images=[]
 let cloudPost=nanoid()
 if(req.files.length>0){
for (const file of req.files) {
    const {secure_url,public_id}=await cloudinary.uploader.upload(file.path,{folder:`SocialMedia/users/${user._id}/posts/${cloudPost}`})
    images.push({publicID:public_id,secretURL:secure_url})
    // post.images=images
  }
  // await post.save()
  
}
const post=await postModel.create({title,description,images:images,author:user._id,cloudPost})
return res.status(201).json({success:true, message: "success create post",result:post})
}
// ======================= update post =======================
export const updatePost =async (req,res,next)=>{
 const {postId}=req.params
 const {title,description}=req.body
 const {user}=req
 const post=await postModel.findOne({_id:postId,author:user._id})
 if(!post){
  return next(new Error("post not found", { cause: 404 }))
 }
 let images=[]
 if(req.files && req.files.length>0){
  for (const file of req.files) {
    const {secure_url,public_id}= await cloudinary.uploader.upload(file.path,{folder:`SocialMedia/users/${user._id}/posts/${post.id}`})
    images.push({publicID:public_id,secretURL:secure_url})
  }
  if(req.files.length>0){
    for (const image of post.images) {
      await cloudinary.uploader.destroy(image.publicID)
    }
  
  }
  post.images=images
 }
 post.title=title
 post.description=description
 await post.save()
 return res.status(200).json({success:true, message: "success update post",result:post})
}
// ======================= Soft Delete Post =======================
export const softDeletePost = async (req,res,next)=>{
 const {postId}=req.params
 const {user}=req
 const post=await postModel.findOne({_id:postId,author:user._id})
 if(!post){
  return next(new Error("post not found", { cause: 404 }))
 }
 post.isDeleted=true
 post.deletedBy=user._id
 await post.save()
 return res.status(200).json({success:true, message: "success soft delete post",result:post})
}

// ======================= Reset Post =======================
export const resetPost = async (req,res,next)=>{
 const {postId}=req.params
 const {user}=req
 const post=await postModel.findOne({_id:postId,author:user._id}).populate([
 {path:"user" ,select:"userName image"},
  {path:"comments",select:"text image createAt",
    populate:{path:"user",select:"userName image"}
  },
 ])
 if(!post){
  return next(new Error("post not found", { cause: 404 }))
 }
 post.isDeleted=false
 await post.save()
 return res.status(200).json({success:true, message: "success reset post",result:post})
}

// ================= Get Single ====================

export const getSinglePost = async (req,res,next)=>{
  const {id}=req.params
  const post=await postModel.findOne({_id:id,isDeleted:false}).populate([
    {path:"user",select:"userName image"},
      {path:"comments",select:"text image createAt",
        populate:{path:"user",select:"userName image"}}
  ])
  if(!post){
    return next(new Error("post not found", { cause: 404 }))
  }
  return res.status(200).json({success:true, message: "success get single post",result:post})
}

// ================== Get All Active====================
export const getAllActive = async (req,res,next)=>{
  const posts=await postModel.find({isDeleted:false}).populate([
    {path:"user",select:"userName image"},
      {path:"comments",select:"text image createAt",
        populate:{path:"user",select:"userName image"}}
  ])
  if(!posts?.length){
    return next(new Error("posts not found", { cause: 404 }))
  }
  // let results=[]
  // for (const post of posts) {
  //   const comment=commentModel.find((post)=>{post._id,post.isDeleted==false})
  //   results.push(post,comment)
  // }
  await posts.populate("comments")
  return res.status(200).json({success:true, message: "success get all posts active",posts})
}

// ================= Get All Not Active====================
export const getAllNotActive = async (req,res,next)=>{
  const posts=await postModel.find({isDeleted:true}).lean()
  if(!posts){
    return next(new Error("posts not found", { cause: 404 }))
  }
  return res.status(200).json({success:true, message: "success get all posts deleted",result:posts})
}

// ================= Like Post and UnLike Post ====================
export const likePost = async (req,res,next)=>{
  const {postId}=req.params
  const {user}=req
  const post=await postModel.findOne({_id:postId,isDeleted:false})
  if(!post){
    return next(new Error("post not found", { cause: 404 }))
  }
  const likes=[]
     const like= post.likes.find((id)=>id.toString()==user._id.toString())
     if(like){
      post.likes=post.likes.filter((like)=>like.toString()!==user._id.toString())
    }else{
      post.likes.push(user._id)
    }
    await post.save()
    
    return res.status(200).json({success:true, message:like?"unlike post":"like post",result:post})
    
}

// ================== Delete Post ====================
export const deletePost = async (req,res,next)=>{
  const {postId}=req.params
  const {user}=req
  const post=await postModel.findOne({_id:postId,author:user._id})
  if(!post){
    return next(new Error("post not found", { cause: 404 }))
  }
  await post.remove()
  return res.status(200).json({success:true, message: "success delete post",result:post})
}