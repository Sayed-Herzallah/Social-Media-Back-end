import mongoose from "mongoose";
export const commentSchema = new mongoose.Schema({
  text:{
    type: String,
    required: function(){
      return this.images ? false : true
    }
},
author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    required: true
  },

  image:{
      secure_url: String,
      public_id:String
      },

  like:[{
    type:mongoose.Types.ObjectId,
    ref:"User"
  }],

  deletedBy:{
    type:mongoose.Types.ObjectId,
    ref:"User"
  },

  isDeleted:{
    type:Boolean,
    default:false
  },
  commentReplay:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comment"
  }

},{timestamps:true})

export const commentModel = mongoose.model("Comment", commentSchema);